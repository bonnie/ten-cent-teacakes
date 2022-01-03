import React, { useState } from "react";
import { dehydrate, QueryClient } from "react-query";

import { Heading } from "@/components/lib/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { queryKeys } from "@/lib/react-query/query-keys";
import { fetchShows } from "@/lib/shows";

import { AddShowModal } from "./components/EditShowModal";
import { ShowsGroup } from "./components/ShowsGroup";
import { EditVenues } from "./components/venues/EditVenues";
import { useShows } from "./hooks/useShows";

// TODO: this is resulting in "Error: connect ECONNREFUSED 127.0.0.1:80"
// export async function getStaticProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(queryKeys.shows, fetchShows);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

const Shows: React.FC = () => {
  const { pastShows, upcomingShows } = useShows();
  const { user } = useWhitelistUser();

  return (
    <>
      <Heading>Shows</Heading>
      {user ? (
        <div className="text-center">
          <AddShowModal />
        </div>
      ) : null}
      <ShowsGroup
        title="Upcoming Shows"
        shows={upcomingShows}
        showTitle={false}
      />
      <div className="mt-10">
        <ShowsGroup title="Past Shows" shows={pastShows} />
      </div>
      {user ? <EditVenues /> : null}
    </>
  );
};

export default Shows;
