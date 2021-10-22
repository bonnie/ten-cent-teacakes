import { Venue } from ".prisma/client";

import { UseMutateFunction, useMutation, useQuery } from "react-query";

import { addVenue, fetchVenues } from "@/lib/api";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";
import { VenuePutData } from "@/pages/api/venues/queries";

type UseVenuesReturnValue = {
  venues: Array<Venue>;
  addVenue: UseMutateFunction<
    {
      venue: Venue;
    },
    unknown,
    VenuePutData,
    unknown
  >;
};

export const useVenues = (): UseVenuesReturnValue => {
  const { handleError } = useHandleError();
  const { data: venues = [] } = useQuery<Array<Venue>>(
    queryKeys.venues,
    fetchVenues,
    {
      onError: handleError,
    },
  );

  const { mutate: addVenueMutate } = useMutation(queryKeys.venues, addVenue);

  return { venues, addVenue: addVenueMutate };
};
