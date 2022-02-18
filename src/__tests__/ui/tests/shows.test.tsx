// import { test } from "@jest/globals";
import dayjs from "dayjs";
import { axe, toHaveNoViolations } from "jest-axe";
import { rest } from "msw";

import { mockOnlyPastShows, yesterday } from "@/__mocks__/mockData";
import { server } from "@/__mocks__/msw/server";
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

  test("link to email list does not display when there are future shows", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);

    const noFutureShowText = screen.queryByText(/No upcoming shows just now/i);
    expect(noFutureShowText).not.toBeInTheDocument();

    const emailListText = screen.queryByText(/join our mailing list/i);
    expect(emailListText).not.toBeInTheDocument();
  });

  test("shows are correctly sorted", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    // find all the show dates; from msw, there are three expected
    const showDates = await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
    expect(showDates.map((date) => date.textContent)).toEqual([
      "Jan 1, 2200",
      dayjs(yesterday).format("MMM DD, YYYY"),
      "Jan 1, 2021",
    ]);
  });

  test("links to shows are correct", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
    const showLinks = screen.queryAllByRole("link");
    expect(showLinks.map((link) => link.getAttribute("href"))).toEqual([
      "http://venue.com/show",
      "http://venue.com",
    ]);
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

describe("no future shows", () => {
  beforeEach(() => {
    server.resetHandlers(
      rest.get("http://localhost:3000/api/shows", (req, res, ctx) =>
        res(ctx.json(mockOnlyPastShows)),
      ),
    );
  });
  test("no shows message and link to email list displays", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);

    const noFutureShowText = screen.queryByText(/No upcoming shows just now/i);
    expect(noFutureShowText).toBeInTheDocument();

    const emailListText = screen.queryByText(/join our mailing list/i);
    expect(emailListText).toBeInTheDocument();
  });

  test("past shows still show up", async () => {
    render(<Shows />, { renderOptions: { hydrate: true } });
    const showDates = await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);

    expect(showDates.map((date) => date.textContent)).toEqual([
      dayjs(yesterday).format("MMM DD, YYYY"),
      "Jan 1, 2021",
    ]);
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
