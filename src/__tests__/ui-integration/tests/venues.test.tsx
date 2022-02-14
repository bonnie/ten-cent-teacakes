// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import { EditVenues } from "@/lib/shows/components/venues/EditVenues";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

test("hydrates on load", async () => {
  render(<EditVenues />, { renderOptions: { hydrate: true } });
  // find all the venue names; from msw, there are two expected, and all start with "Venue "
  const showDates = await screen.findAllByText(/Venue /);
  expect(showDates).toHaveLength(2);
});

test("should have no a11y errors caught by jest-axe", async () => {
  const { container } = render(<EditVenues />, {
    renderOptions: { hydrate: true },
  });

  // to avoid "not wrapped in act"
  await screen.findAllByText(/Venue /);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
