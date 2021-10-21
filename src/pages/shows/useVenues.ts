import { Venue } from ".prisma/client";

import { useQuery } from "react-query";

import { fetchVenues } from "@/lib/api";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

export const useVenues = (): Array<Venue> => {
  const { handleError } = useHandleError();
  const { data: venues = [] } = useQuery<Array<Venue>>(
    queryKeys.shows,
    fetchVenues,
    {
      onError: handleError,
    },
  );

  return venues;
};
