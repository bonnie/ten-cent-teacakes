import React, { useState } from "react";
import { dehydrate, QueryClient } from "react-query";

import { AddButton } from "@/components/lib/AddButton";
import { Heading } from "@/components/lib/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { queryKeys } from "@/lib/react-query/query-keys";
import { fetchShows } from "@/lib/shows";

import { AddShow } from "./components/AddShow";
import { EditVenues } from "./components/EditVenues";
import { ShowsSegment } from "./components/ShowsSegment";
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
  const [addingShow, setAddingShow] = useState(false);
  const { user } = useWhitelistUser();

  const addShow = () => {
    setAddingShow((state) => !state);
  };

  return (
    <div className="mx-4">
      <Heading>Shows</Heading>
      {user ? <AddButton clickHandler={addShow} /> : null}
      {addingShow ? <AddShow setAddingShow={setAddingShow} /> : null}
      <ShowsSegment title="Upcoming Shows" shows={upcomingShows} />
      <ShowsSegment title="Past Shows" shows={pastShows} />
      {user ? <EditVenues /> : null}
    </div>
  );
};

export default Shows;
