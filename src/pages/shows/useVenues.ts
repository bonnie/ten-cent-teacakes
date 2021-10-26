import { Venue } from ".prisma/client";

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
  const { handleError } = useHandleError();
  const queryClient = useQueryClient();

  const invalidateVenues = () =>
    queryClient.invalidateQueries([queryKeys.venues]);

  const { data: venues = [] } = useQuery<Array<Venue>>(
    queryKeys.venues,
    fetchVenues,
    {
      onError: handleError,
    },
  );

  const { mutate: addVenueMutate } = useMutation(queryKeys.venues, addVenue, {
    onSuccess: (data) => {
      invalidateVenues();
      showToast("success", `You have added the venue "${data.venue.name}"`);
    },
  });

  const { mutate: deleteVenueMutate } = useMutation(
    queryKeys.venues,
    deleteVenue,
    {
      onSuccess: () => {
        invalidateVenues();
        showToast("success", `You have deleted the venue`);
      },
    },
  );

  const { mutate: updateVenue } = useMutation(queryKeys.venues, patchVenue, {
    onSuccess: (data) => {
      invalidateVenues();
      showToast("success", `You have updated the venue "${data.venue.name}"`);
    },
  });

  return {
    venues,
    addVenue: addVenueMutate,
    deleteVenue: deleteVenueMutate,
    updateVenue,
  };
};
