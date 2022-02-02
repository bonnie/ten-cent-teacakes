// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import Shows from "@/pages/shows";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

test("hydrates on load", async () => {
  render(<Shows />, { renderOptions: { hydrate: true } });
  // find all the show dates; from msw, there are three expected
  const showDates = await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
  expect(showDates).toHaveLength(3);
});

test("should have no a11y errors caught by jest-axe", async () => {
  const { container } = render(<Shows />, { renderOptions: { hydrate: true } });

  // otherwise, get "not wrapped in act"
  await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
