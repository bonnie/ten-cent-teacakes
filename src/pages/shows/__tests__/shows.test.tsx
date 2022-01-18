import { render, screen } from "@testing-library/react";

import Shows from "..";

test("hydrates on load", async () => {
  render(<Shows />, { hydrate: true });

  // find all the show dates; from msw, there are two expected
  const showDates = await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
  expect(showDates).toHaveLength(2);
});
