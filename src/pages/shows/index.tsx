import React from "react";
import { dehydrate, QueryClient } from "react-query";

import { Heading } from "@/components/Heading";
import { fetchShows } from "@/lib/api";
import { queryKeys } from "@/lib/react-query/query-keys";

import { ShowsSegment } from "./ShowsSegment";
import { useShows } from "./useShows";

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
  const { pastShows, upcomingShows } = useShows();

  return (
    <div>
      <Heading>Shows</Heading>
      <ShowsSegment title="Upcoming Shows" shows={upcomingShows} />
      <ShowsSegment title="Past Shows" shows={pastShows} />
    </div>
  );
};

export default Shows;
