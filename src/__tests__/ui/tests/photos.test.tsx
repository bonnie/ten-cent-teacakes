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
    await screen.findAllByRole("img");
    const mutateButtons = screen.queryAllByRole("button", {
      name: /add|edit|delete/i,
    });
    expect(mutateButtons).toHaveLength(0);
  });

  // this is not exactly testing production code, since Link is mocked
  // in setup.test.js (thanks to
  // https://github.com/vercel/next.js/issues/20048#issuecomment-813426025)
  test("photos are in correct order, with correct labels", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });
    const images = await screen.findAllByRole("img");
    const imgSources = images.map((image) => image.getAttribute("src"));
    expect(imgSources).toEqual([
      "photos/photo2-thumb.jpg",
      "photos/photo3-thumb.jpg",
      "photos/photo1A-thumb.jpg",
      "photos/photo1B-thumb.jpg",
      "photos/photo1C-thumb.jpg",
    ]);

    // from mockData
    const allDates = screen.getAllByText(/\w\w\w \d?\d, \d\d\d\d/);
    expect(allDates.map((date) => date.textContent)).toEqual([
      dayjs(yesterday).format("MMM DD, YYYY"),
      dayjs(lastMonth).format("MMM DD, YYYY"),
      "Jan 01, 2021 at Venue 2",
      "Jan 01, 2021 at Venue 2",
      "Jan 01, 2021 at Venue 2",
    ]);

    // 3 should mention photographer
    const photographer = screen.getAllByText(/taken by Jane A Photographer/);
    expect(photographer).toHaveLength(3);
  });

  // NOTE: need to test this when Link is not mocked
  test("photos have link to individual photo page", async () => {
    render(<Photos />, { renderOptions: { hydrate: true } });
    const links = await screen.findAllByRole("link");

    // ids corresponding to the photo order
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/photos/1",
      "/photos/2",
      "/photos/3",
      "/photos/5",
      "/photos/4",
    ]);
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
