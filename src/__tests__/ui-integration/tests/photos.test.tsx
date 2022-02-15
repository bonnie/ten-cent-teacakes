// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import Photos from "@/pages/photos";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

// issues with Link causing "not wrapped in act" errors
// https://github.com/vercel/next.js/issues/20048#issuecomment-813426025
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactElement;
    href: string;
  }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <children.type {...children.props} href={href} />
  ),
}));

describe("not logged in", () => {
  test("hydrates on load", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });
    // find all the images; from msw, there are three expected
    const images = await screen.findAllByAltText(/photo|ten/i);
    expect(images).toHaveLength(3);
  });

  test("should not show add button", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });
    const addButtons = screen.queryAllByRole("button", { name: /add/i });
    expect(addButtons).toHaveLength(0);

    // to avoid "not wrapped in act" error
    await screen.findAllByRole("img");
  });

  test("should have no a11y errors caught by jest-axe", async () => {
    const { container } = render(<Photos />, {
      renderOptions: { hydrate: true },
    });

    await screen.findAllByAltText(/photo|ten/i); // to avoid "not wrapped in act"
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
