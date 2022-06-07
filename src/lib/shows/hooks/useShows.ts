import { useState } from "react";
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
  ShowResponse,
} from "@/lib/shows";
import {
  ShowPatchArgs,
  ShowPutData,
  ShowWithVenue,
  SortedShows,
} from "@/lib/shows/types";

import { sortShows } from "../utils";

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
  const { handleQueryError, handleMutateError } = useHandleError();
  useQuery<Array<ShowWithVenue>>(queryKeys.shows, fetchShows, {
    onError: handleQueryError,
    onSuccess: (data) => {
      setShows(sortShows(data));
    },
  });

  const queryClient = useQueryClient();
  const invalidateShows = () =>
    queryClient.invalidateQueries([queryKeys.shows]);
  const invalidateVenues = () =>
    queryClient.invalidateQueries([queryKeys.venues]);

  const { mutate: addShowMutate } = useMutation(queryKeys.shows, addShow, {
    onSuccess: () => {
      invalidateShows();
      invalidateVenues();
      showToast("success", "You have added a show");
    },
    onError: (error) => handleMutateError(error, "add show"),
  });

  const { mutate: deleteShowMutate } = useMutation(
    queryKeys.shows,
    deleteShow,
    {
      onSuccess: () => {
        invalidateShows();
        invalidateVenues();
        showToast("success", `You have deleted the show`);
      },
      onError: (error) => handleMutateError(error, "delete show"),
    },
  );

  const { mutate: updateShow } = useMutation(queryKeys.shows, patchShow, {
    onSuccess: () => {
      invalidateShows();
      invalidateVenues();
      showToast("success", "You have updated the show");
    },
    onError: (error) => handleMutateError(error, "update show"),
  });

  return {
    ...shows,
    addShow: addShowMutate,
    updateShow,
    deleteShow: deleteShowMutate,
  };
};
