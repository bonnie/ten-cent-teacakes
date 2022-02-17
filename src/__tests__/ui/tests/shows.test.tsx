// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import Shows from "@/pages/shows";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

// for typescript
const mockedUseWhitelistUser = useWhitelistUser as jest.Mock;

describe("not logged in", () => {
  test("hydrates on load", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    // find all the show dates; from msw, there are three expected
    const showDates = await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
    expect(showDates).toHaveLength(3);
  });

  test("should not show mutate buttons", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
    const mutateButtons = screen.queryAllByRole("button", {
      name: /add|edit|delete/i,
    });
    expect(mutateButtons).toHaveLength(0);
  });

  test("should have no a11y errors caught by jest-axe", async () => {
    const { container } = render(<Shows />, {
      renderOptions: { hydrate: true },
    });

    // to avoid "not wrapped in act"
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
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
    const { container } = render(<Shows />, {
      renderOptions: { hydrate: true },
    });

    // to avoid "not wrapped in act"
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test("show and venue add buttons", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    const addButtons = screen.getAllByRole("button", { name: /add/i });
    expect(addButtons).toHaveLength(2);
    addButtons.forEach((button) => expect(button).toBeVisible());

    // to avoid "not wrapped in act" errors
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
  });
  test("shows have edit button and delete buttons", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);

    const editButtons = await screen.findAllByRole("button", {
      name: /edit show/i,
    });
    expect(editButtons).toHaveLength(3);

    // no need to await here, since edit buttons have already been displayed
    const deleteButtons = screen.queryAllByRole("button", {
      name: /delete show/i,
    });
    expect(deleteButtons).toHaveLength(3);
  });
  test("Venues show up, and have correct buttons", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    const venuesTitle = screen.getByRole("heading", {
      name: /venues/i,
    });
    expect(venuesTitle).toBeInTheDocument();

    const editButtons = await screen.findAllByRole("button", {
      name: /edit venue/i,
    });
    expect(editButtons).toHaveLength(3);

    // no need to await here, since edit buttons have already been displayed
    const deleteButtons = screen.queryAllByRole("button", {
      name: /delete venue/i,
    });
    expect(deleteButtons).toHaveLength(3);

    // make sure only the button for the one venue with
    // no shows ("venue 3") is enabled
    expect(
      deleteButtons.filter((button) => !button.hasAttribute("disabled")),
    ).toHaveLength(1);
  });
});
