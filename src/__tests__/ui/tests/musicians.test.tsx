// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import Musicians from "@/pages/band";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

// for typescript
const mockedUseWhitelistUser = useWhitelistUser as jest.Mock;

describe("not logged in", () => {
  test("hydrates on load", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
    // find all the Musician images; from msw, there are three expected
    const musicianImages = await screen.findAllByRole("img");
    expect(musicianImages).toHaveLength(3);
  });
  test("should not show mutate buttons", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
    await screen.findAllByRole("img");
    const mutateButtons = screen.queryAllByRole("button", {
      name: /add|edit|delete/i,
    });
    expect(mutateButtons).toHaveLength(0);
  });

  test("should have no a11y errors caught by jest-axe", async () => {
    const { container } = render(<Musicians />, {
      renderOptions: { hydrate: true },
    });

    // to avoid "not wrapped in act"
    await screen.findAllByRole("img");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("logged in", () => {
  beforeEach(() => {
    // mocking returned user
    mockedUseWhitelistUser.mockImplementation(() => ({
      user: { email: "test@test.com" },
    }));
  });
  afterEach(() => {
    mockedUseWhitelistUser.mockImplementation(() => ({
      user: undefined,
    }));
  });
  test("should have no a11y errors caught by jest-axe", async () => {
    const { container } = render(<Musicians />, {
      renderOptions: { hydrate: true },
    });

    // to avoid "not wrapped in act"
    await screen.findAllByRole("img");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test("musician and instrument add buttons", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
    const addButtons = screen.getAllByRole("button", { name: /add/i });
    expect(addButtons).toHaveLength(2);
    addButtons.forEach((button) => expect(button).toBeVisible());

    // to avoid "not wrapped in act" errors
    await screen.findAllByRole("img");
  });
  test("musicians have edit button but not delete button", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
    await screen.findAllByRole("img");

    const editButtons = await screen.findAllByRole("button", {
      name: /edit musician/i,
    });
    expect(editButtons).toHaveLength(3);

    // no need to await here, since edit buttons have already been displayed
    const deleteButtons = screen.queryAllByRole("button", {
      name: /delete musician/i,
    });
    expect(deleteButtons).toHaveLength(0);
  });
  test("Instruments show up, and have correct buttons", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
    const instrumentsTitle = screen.getByRole("heading", {
      name: /instruments/i,
    });
    expect(instrumentsTitle).toBeInTheDocument();

    const editButtons = await screen.findAllByRole("button", {
      name: /edit instrument/i,
    });
    expect(editButtons).toHaveLength(7);

    // no need to await here, since edit buttons have already been displayed
    const deleteButtons = screen.queryAllByRole("button", {
      name: /delete instrument/i,
    });
    expect(deleteButtons).toHaveLength(7);

    // make sure only the button for the one instrument with
    // no musicians ("tuba") is enabled
    expect(
      deleteButtons.filter((button) => !button.hasAttribute("disabled")),
    ).toHaveLength(1);
  });
});
