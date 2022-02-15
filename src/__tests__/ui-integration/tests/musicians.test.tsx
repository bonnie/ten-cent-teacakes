// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import Musicians from "@/pages/band";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

describe("not logged in", () => {
  // TODO: not actually not logged in
  test("hydrates on load", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
    // find all the Musician images; from msw, there are three expected
    const showDates = await screen.findAllByRole("img");
    expect(showDates).toHaveLength(3);
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
  test("musician and instrument add buttons", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
    const addButton = await screen.findAllByRole("button", { name: /add/i });
    expect(addButton).toHaveLength(2);
  });
  test("musicians have edit button but not delete button", async () => {
    render(<Musicians />, { renderOptions: { hydrate: true } });
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
});
