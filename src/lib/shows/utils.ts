import dayjs from "dayjs";

import { ShowWithVenue, SortedShows } from "./types";

export const formattedPerformAt = (performAt: Date): string =>
  dayjs(performAt).format("YYYY MMM D hh:MM a");

export const sortShows = (shows: Array<ShowWithVenue>) => {
  const sortedShows: SortedShows = {
    upcomingShows: [],
    pastShows: [],
  };

  shows.forEach((show) => {
    if (dayjs(show.performAt) < dayjs()) {
      sortedShows.pastShows.push(show);
    } else {
      sortedShows.upcomingShows.push(show);
    }
  });

  // then sort within the buckets
  sortedShows.pastShows.sort((a, b) => (b.performAt < a.performAt ? -1 : 1));
  sortedShows.upcomingShows.sort((a, b) =>
    a.performAt < b.performAt ? -1 : 1,
  );

  return sortedShows;
};
