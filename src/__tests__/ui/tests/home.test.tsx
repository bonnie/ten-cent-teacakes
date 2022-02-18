// import { test } from "@jest/globals";
import dayjs from "dayjs";
import { axe, toHaveNoViolations } from "jest-axe";
import { rest } from "msw";

import {
  mockManyFutureShows,
  mockOnlyPastShows,
  mockPhotos,
  nextMonth,
  tomorrow,
} from "@/__mocks__/mockData";
import { server } from "@/__mocks__/msw/server";
import Home from "@/pages";
import { render, screen, waitFor } from "@/test-utils";

expect.extend(toHaveNoViolations);

test("should have no a11y errors caught by jest-axe", async () => {
  const { container } = render(<Home />, {
    renderOptions: { hydrate: true },
  });

  await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
  // necessary since there's a sync image on the page
  await waitFor(() => {
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(4);
  });

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("should have 'subscribe' button", async () => {
  render(<Home />, { renderOptions: { hydrate: true } });
  await screen.findAllByText(/\w\w\w \d?\d, \d\d\d\d/);
  const subscribeButton = screen.getByRole("button", { name: /subscribe/i });
  expect(subscribeButton).toBeInTheDocument();
});

test("should show only three most recent photos", async () => {
  render(<Home />, { renderOptions: { hydrate: true } });
  await waitFor(() => {
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(4);
  });
  const images = screen.getAllByRole("img");
  const imgSources = images
    .map((image) => image.getAttribute("src"))
    .filter((src) => src?.startsWith("photos"));
  expect(imgSources).toEqual([
    "photos/photo2-thumb.jpg",
    "photos/photo3-thumb.jpg",
    "photos/photo1A-thumb.jpg",
  ]);

  const morePhotosLink = screen.getByRole("link", { name: /more photos/i });
  expect(morePhotosLink).toHaveAttribute("href", "/photos");
});

test("should show only three nearest future shows", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3000/api/shows", (req, res, ctx) =>
      res(ctx.json(mockManyFutureShows)),
    ),
    rest.get("http://localhost:3000/api/photos", (req, res, ctx) =>
      res(ctx.json(mockPhotos)),
    ),
  );

  render(<Home />, { renderOptions: { hydrate: true } });
  await screen.findAllByText(/Venue/i);
  await waitFor(() => {
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(4);
  });

  const upcomingShows = screen.queryByRole("heading", {
    name: "Upcoming Shows",
  });
  expect(upcomingShows).toBeInTheDocument();

  const showDates = screen
    .queryAllByText(/\w\w\w \d?\d, \d\d\d\d/)
    .filter((element) => element.classList.contains("text-lg"))
    .map((date) => date.textContent);
  expect(showDates).toEqual([
    dayjs(tomorrow).format("MMM DD, YYYY"),
    dayjs(nextMonth).format("MMM DD, YYYY"),
    "Jan 1, 2200",
  ]);

  const moreShowsLink = screen.getByRole("link", { name: /more shows/i });
  expect(moreShowsLink).toHaveAttribute("href", "/shows");
});

test("should not show any shows if there are no future shows", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3000/api/shows", (req, res, ctx) =>
      res(ctx.json(mockOnlyPastShows)),
    ),
    rest.get("http://localhost:3000/api/photos", (req, res, ctx) =>
      res(ctx.json(mockPhotos)),
    ),
  );
  render(<Home />, { renderOptions: { hydrate: true } });
  await waitFor(() => {
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(4);
  });

  const upcomingShows = screen.queryByRole("heading", {
    name: "Upcoming Shows",
  });
  expect(upcomingShows).not.toBeInTheDocument();
});
