import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Heading } from "@/components/Heading";
import { fetchShows } from "@/lib/api";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.shows, fetchShows);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

// TODO: when to use React.FC and when to use React.ReactElement?
const Shows: React.FC = () => {
  const { handleError } = useHandleError();

  const { data: shows = [] } = useQuery(queryKeys.shows, fetchShows, {
    onError: handleError,
  });

  return (
    <div>
      <Heading>Upcoming Shows</Heading>
      <ul>
        {shows.map((show) => (
          <li>
            {show.performAt} {show.venueId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shows;
