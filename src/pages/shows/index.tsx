import React from "react";
import { dehydrate, QueryClient } from "react-query";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { queryKeys } from "@/lib/react-query/query-keys";
import { fetchShows } from "@/lib/shows";
import { AddShowModal } from "@/lib/shows/components/EditShowModal";
import { ShowsGroup } from "@/lib/shows/components/ShowsGroup";
import { EditVenues } from "@/lib/shows/components/venues/EditVenues";
import { useShows } from "@/lib/shows/hooks/useShows";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.shows, fetchShows);
  // console.log(dehydrate(queryClient));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

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
