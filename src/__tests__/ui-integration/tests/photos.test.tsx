import dayjs from "dayjs";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import { lastMonth, yesterday } from "@/__mocks__/mockData";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import Photos from "@/pages/photos";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

// for typescript
const mockedUseWhitelistUser = useWhitelistUser as jest.Mock;

describe("not logged in", () => {
  test("hydrates on load", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });
    // find all the images; from msw, there are three expected
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(5);
  });

  test("should not show mutate buttons", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });

    const addButtons = screen.queryAllByRole("button", { name: /add/i });
    expect(addButtons).toHaveLength(0);

    await screen.findAllByRole("img");
    const editButtons = screen.queryAllByRole("button", {
      name: /edit photo/i,
    });
    expect(editButtons).toHaveLength(0);

    // delete buttons
    const deleteButtons = screen.queryAllByRole("button", {
      name: /delete photo/i,
    });
    expect(deleteButtons).toHaveLength(0);
  });

  test("photos are in correct order, with correct labels", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });
    const images = await screen.findAllByRole("img");
    const imgSources = images.map((image) => image.getAttribute("src"));
    expect(imgSources).toEqual([
      "photos/photo1A-thumb.jpg",
      "photos/photo1B-thumb.jpg",
      "photos/photo1C-thumb.jpg",
      "photos/photo2-thumb.jpg",
      "photos/photo3-thumb.jpg",
    ]);

    // according to mockDta, 1 of the images should have a date of yesterday
    const yesterdayDates = screen.getAllByText(
      dayjs(yesterday).format("MMM DD, YYYY"),
    );
    expect(yesterdayDates).toHaveLength(1);

    // 4 should have date of lastMonth
    const lastMonthDates = screen.getAllByText(
      dayjs(lastMonth).format("MMM DD, YYYY"),
    );
    expect(lastMonthDates).toHaveLength(4);

    // 3 should mention venue 1
    const venue1 = screen.getAllByText("at Venue 1");
    expect(venue1).toHaveLength(3);

    // 3 should mention photographer
    const photographer = screen.getAllByText("taken by Jane A Photographer");
    expect(photographer).toHaveLength(3);
  });

  // NOTE: need to test this when Link is not mocked
  // test("photos have link to individual photo page", async () => {
  //   render(<Photos />, { renderOptions: { hydrate: true } });
  //   const hrefs = await screen.findAllByRole("link");

  //   // 3 is id of "photos/photo1A-thumb.jpg" in mockData
  //   expect(hrefs[0]).toHaveAttribute("href", "/photos/3");
  // });

  test("should have no a11y errors caught by jest-axe", async () => {
    const { container } = render(<Photos />, {
      renderOptions: { hydrate: true },
    });

    await screen.findAllByRole("img"); // to avoid "not wrapped in act"
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
  test("should have mutate buttons", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });
    await screen.findAllByRole("img");

    // add button
    const addButtons = screen.getAllByRole("button", { name: /add/i });
    expect(addButtons).toHaveLength(1);
    addButtons.forEach((button) => expect(button).toBeVisible());

    // edit buttons
    const editButtons = screen.getAllByRole("button", {
      name: /edit photo/i,
    });
    expect(editButtons).toHaveLength(5);

    // delete buttons
    const deleteButtons = screen.getAllByRole("button", {
      name: /delete photo/i,
    });
    expect(deleteButtons).toHaveLength(5);
  });

  test("should have no a11y errors caught by jest-axe", async () => {
    const { container } = render(<Photos />, {
      renderOptions: { hydrate: true },
    });

    await screen.findAllByRole("img"); // to avoid "not wrapped in act"
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
