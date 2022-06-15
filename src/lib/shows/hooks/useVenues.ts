import { useMemo } from "react";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  // useQueryClient,
} from "react-query";

import { useToast } from "@/components/toasts/useToast";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";
import { addVenue, deleteVenue, fetchVenues, patchVenue } from "@/lib/venues";
import {
  VenuePatchArgs,
  VenuePatchResponse,
  VenuePutData,
  VenueResponse,
  VenueWithShowCount,
} from "@/lib/venues/types";

type UseVenuesReturnValue = {
  venues: Array<VenueWithShowCount>;
  venueFormValidation: (values: VenuePutData) => {
    name?: string;
    url?: string;
  };
  addVenue: UseMutateFunction<VenueResponse, unknown, VenuePutData, unknown>;
  deleteVenue: UseMutateFunction<void, unknown, number, unknown>;
  updateVenue: UseMutateFunction<
    VenuePatchResponse,
    unknown,
    VenuePatchArgs,
    unknown
  >;
};

export const useVenues = (): UseVenuesReturnValue => {
  const { showToast } = useToast();
  const { handleQueryError, handleMutateError } = useHandleError();
  // const queryClient = useQueryClient();

  // const invalidateVenues = () =>
  //   queryClient.invalidateQueries([queryKeys.venues]);

  const { data: venues = [] } = useQuery<Array<VenueWithShowCount>>(
    queryKeys.venues,
    fetchVenues,
    {
      onError: handleQueryError,
    },
  );

  const { mutate: addVenueMutate } = useMutation(queryKeys.venues, addVenue, {
    onSuccess: (data) => {
      showToast("success", `You have added the venue "${data.venue.name}"`);
    },
    onError: (error) => handleMutateError(error, "add venue"),
  });

  const { mutate: deleteVenueMutate } = useMutation(
    queryKeys.venues,
    deleteVenue,
    {
      onSuccess: () => {
        showToast("success", "You have deleted the venue");
      },
      onError: (error) => handleMutateError(error, "delete venue"),
    },
  );

  const { mutate: updateVenue } = useMutation(queryKeys.venues, patchVenue, {
    onSuccess: (data) => {
      showToast("success", `You have updated the venue "${data.venue.name}"`);
    },
    onError: (error) => handleMutateError(error, "update venue"),
  });

  const venueNamesLower = useMemo(
    () => venues.map((venue) => venue.name.toLowerCase()),
    [venues],
  );

  const venueUrlsLower = useMemo(
    () =>
      venues
        .filter((venue) => venue.url)
        .map((venue) => venue.url?.toLowerCase()),
    [venues],
  );

  const venueFormValidation = (values: VenuePutData) => {
    const errors: { name?: string; url?: string } = {};
    if (!values.name) {
      errors.name = "Venue name is required";
    } else if (
      values.name &&
      venueNamesLower.includes(values.name.toLowerCase())
    ) {
      errors.name = `Venue "${values.name}" already exists`;
    }
    if (values.url && venueUrlsLower.includes(values.url.toLowerCase())) {
      errors.url = `Venue with URL "${values.url}" already exists`;
    }
    return errors;
  };

  return {
    venues,
    venueFormValidation,
    addVenue: addVenueMutate,
    deleteVenue: deleteVenueMutate,
    updateVenue,
  };
};
