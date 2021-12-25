import { useEffect, useState } from "react";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { useToast } from "@/components/toasts/useToast";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";
import {
  addShow,
  deleteShow,
  fetchShows,
  patchShow,
  ShowPatchArgs,
  ShowPutData,
  ShowResponse,
  ShowWithVenue,
} from "@/lib/shows";

type SortedShows = {
  upcomingShows: Array<ShowWithVenue>;
  pastShows: Array<ShowWithVenue>;
};

const sortShows = (data: Array<ShowWithVenue>): SortedShows => {
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

type UseShowsReturnValue = {
  pastShows: Array<ShowWithVenue>;
  upcomingShows: Array<ShowWithVenue>;
  addShow: UseMutateFunction<ShowResponse, unknown, ShowPutData, unknown>;
  deleteShow: UseMutateFunction<void, unknown, number, unknown>;
  updateShow: UseMutateFunction<ShowResponse, unknown, ShowPatchArgs, unknown>;
};

export const useShows = (): UseShowsReturnValue => {
  const [shows, setShows] = useState<SortedShows>({
    upcomingShows: [],
    pastShows: [],
  });

  const { showToast } = useToast();
  const { handleError } = useHandleError();
  const { data = [] } = useQuery<Array<ShowWithVenue>>(
    queryKeys.shows,
    fetchShows,
    {
      onError: handleError,
    },
  );

  const queryClient = useQueryClient();
  const invalidateShows = () =>
    queryClient.invalidateQueries([queryKeys.shows]);

  const { mutate: addShowMutate } = useMutation(queryKeys.shows, addShow, {
    onSuccess: () => {
      invalidateShows();
      showToast("success", "You have added a show");
    },
  });

  const { mutate: deleteShowMutate } = useMutation(
    queryKeys.shows,
    deleteShow,
    {
      onSuccess: () => {
        invalidateShows();
        showToast("success", `You have deleted the show`);
      },
    },
  );

  const { mutate: updateShow } = useMutation(queryKeys.shows, patchShow, {
    onSuccess: () => {
      invalidateShows();
      showToast("success", "You have updated the show");
    },
  });

  // Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
  // useEffect(() => {
  //   setShows(sortShows(data));
  // }, [data]);

  return {
    ...shows,
    addShow: addShowMutate,
    updateShow,
    deleteShow: deleteShowMutate,
  };
};
