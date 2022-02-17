// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import Shows from "@/pages/shows";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

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
