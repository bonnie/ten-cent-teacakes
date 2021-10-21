import { Show } from ".prisma/client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { fetchShows } from "@/lib/api";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

type SortedShows = {
  upcomingShows: Array<Show>;
  pastShows: Array<Show>;
};

const sortShows = (data: Array<Show>): SortedShows => {
  const sortedShows: SortedShows = {
    upcomingShows: [],
    pastShows: [],
  };
  const today = new Date();

  // first sort into two buckets
  data.forEach((show) => {
    if (show.performAt < today) {
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

export const useShows = (): SortedShows => {
  const [shows, setShows] = useState<SortedShows>({
    upcomingShows: [],
    pastShows: [],
  });

  const { handleError } = useHandleError();
  const { data = [] } = useQuery<Array<Show>>(queryKeys.shows, fetchShows, {
    onError: handleError,
  });

  useEffect(() => {
    setShows(sortShows(data));
  }, [data]);

  return shows;
};