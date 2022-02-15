// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import { Navbar } from "@/components/Layout/Navbar";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

test("should have no a11y errors caught by jest-axe", async () => {
  const { container } = render(<Navbar />);

  // to avoid "not wrapped in act"
  await screen.findAllByRole("img");
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
