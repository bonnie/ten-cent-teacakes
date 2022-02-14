// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import Musicians from "@/pages/band";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

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
