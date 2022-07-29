import Head from "next/head";
import React, { useState } from "react";
import { tw } from "twind";

import { Button } from "@/components/lib/Button";
import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { AddShowModal } from "@/lib/shows/components/EditShowModal";
import { ShowsGroup } from "@/lib/shows/components/ShowsGroup";
import { EditVenues } from "@/lib/shows/components/venues/EditVenues";
import { useShows } from "@/lib/shows/hooks/useShows";

// don't pre-fetch shows here; won't help with SEO and makes page load slow

const Shows: React.FC = () => {
  const { pastShows, upcomingShows } = useShows();
  const { user } = useWhitelistUser();
  const [showAllPastShows, setShowAllPastShows] = useState(false);

  const handleClick = () => {
    setShowAllPastShows((prev) => !prev);
  };
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
        <ShowsGroup
          title="Recent Shows"
          shows={showAllPastShows ? pastShows : pastShows.slice(0, 5)}
        />
        <div className={tw(["text-center"])}>
          <Button handleClick={handleClick}>
            {showAllPastShows ? "Fewer shows" : "More shows"}
          </Button>
        </div>
      </div>
      {user ? <EditVenues /> : null}
    </>
  );
};

export default Shows;
