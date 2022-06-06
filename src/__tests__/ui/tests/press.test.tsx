import { axe, toHaveNoViolations } from "jest-axe";

import Press from "@/pages/press";
import { render, screen, waitFor } from "@/test-utils";

expect.extend(toHaveNoViolations);

test("should have no a11y errors caught by jest-axe", async () => {
  const { container } = render(<Press />);

  await waitFor(() => {
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(2);
  });

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("should contain expected elements", async () => {
  render(<Press />);

  const heading = screen.getByText("Press");
  expect(heading).toBeInTheDocument();

  await waitFor(() => {
    const imgs = screen.getAllByAltText(/ten-cent teacakes/i);
    expect(imgs).toHaveLength(2);
  });
});
