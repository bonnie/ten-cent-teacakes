import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { getSortedShows } from "@/lib/prisma/queries/shows";
import { getVenues } from "@/lib/prisma/queries/venues";
import { AddShowModal } from "@/lib/shows/components/EditShowModal";
import { ShowsGroup } from "@/lib/shows/components/ShowsGroup";
import { EditVenues } from "@/lib/shows/components/venues/EditVenues";
import { ShowWithVenue } from "@/lib/shows/types";
import { VenueWithShowCount } from "@/lib/venues/types";

export async function getStaticProps() {
  const venues = await getVenues();
  const sortedShows = await getSortedShows();

  return {
    props: {
      // dates in shows are not serializable
      showsJSON: JSON.stringify(sortedShows),
      venues,
    },
    revalidate: 60 * 60 * 24, // revalidate once a day to clear old shows
  };
}

const Shows: React.FC<{
  showsJSON: string;
  venues: Array<VenueWithShowCount>;
}> = ({ showsJSON, venues }) => {
  const { user } = useWhitelistUser();
  const {
    upcomingShows,
    pastShows,
  }: { upcomingShows: Array<ShowWithVenue>; pastShows: Array<ShowWithVenue> } =
    JSON.parse(showsJSON);

  return (
    <>
      <Head>
        <title>Ten-Cent Teacakes: Shows</title>
      </Head>
      <Heading>Shows</Heading>
      {user ? (
        <div className={tw(["text-center"])}>
          <AddShowModal />
        </div>
      ) : null}
      <ShowsGroup
        title="Upcoming Shows"
        shows={upcomingShows}
        showTitle={false}
      />
      <div className={tw(["mt-10"])}>
        <ShowsGroup title="Recent Shows" shows={pastShows.slice(0, 10)} />
      </div>
      {user ? <EditVenues venues={venues} /> : null}
    </>
  );
};

export default Shows;
