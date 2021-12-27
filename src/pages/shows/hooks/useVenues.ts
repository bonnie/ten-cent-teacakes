import { Venue } from ".prisma/client";

import { useMemo } from "react";
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
  addVenue,
  deleteVenue,
  fetchVenues,
  patchVenue,
  VenuePatchArgs,
  VenuePutData,
  VenueResponse,
} from "@/lib/venues";

type UseVenuesReturnValue = {
  venues: Array<Venue>;
  venueNamesLower: Array<string>;
  addVenue: UseMutateFunction<VenueResponse, unknown, VenuePutData, unknown>;
  deleteVenue: UseMutateFunction<void, unknown, number, unknown>;
  updateVenue: UseMutateFunction<
    VenueResponse,
    unknown,
    VenuePatchArgs,
    unknown
  >;
};

export const useVenues = (): UseVenuesReturnValue => {
  const { showToast } = useToast();
  const { handleQueryError, handleMutateError } = useHandleError();
  const queryClient = useQueryClient();

  const invalidateVenues = () =>
    queryClient.invalidateQueries([queryKeys.venues]);

  const { data: venues = [] } = useQuery<Array<Venue>>(
    queryKeys.venues,
    fetchVenues,
    {
      onError: handleQueryError,
    },
  );

  const venueNamesLower = useMemo(
    () => venues.map((venue) => venue.name.toLowerCase()),
    [venues],
  );

  const { mutate: addVenueMutate } = useMutation(queryKeys.venues, addVenue, {
    onSuccess: (data) => {
      invalidateVenues();
      showToast("success", `You have added the venue "${data.venue.name}"`);
    },
    onError: (error) => handleMutateError(error, "add venue"),
  });

  const { mutate: deleteVenueMutate } = useMutation(
    queryKeys.venues,
    deleteVenue,
    {
      onSuccess: () => {
        invalidateVenues();
        showToast("success", `You have deleted the venue`);
      },
      onError: (error) => handleMutateError(error, "delete venue"),
    },
  );

  const { mutate: updateVenue } = useMutation(queryKeys.venues, patchVenue, {
    onSuccess: (data) => {
      invalidateVenues();
      showToast("success", `You have updated the venue "${data.venue.name}"`);
    },
    onError: (error) => handleMutateError(error, "update venue"),
  });

  return {
    venues,
    venueNamesLower,
    addVenue: addVenueMutate,
    deleteVenue: deleteVenueMutate,
    updateVenue,
  };
};
