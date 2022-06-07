import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { getShows } from "@/lib/prisma/queries/shows";
import { AddShowModal } from "@/lib/shows/components/EditShowModal";
import { ShowsGroup } from "@/lib/shows/components/ShowsGroup";
import { EditVenues } from "@/lib/shows/components/venues/EditVenues";
import { sortShows } from "@/lib/shows/utils";

export async function getStaticProps() {
  const shows = await getShows();

  return {
    props: {
      showsJSON: JSON.stringify(shows),
    },
  };
}

const Shows: React.FC<{ showsJSON: string }> = ({ showsJSON }) => {
  const { user } = useWhitelistUser();
  const shows = JSON.parse(showsJSON);

  const { pastShows, upcomingShows } = sortShows(shows);

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
      {user ? <EditVenues /> : null}
    </>
  );
};

export default Shows;
