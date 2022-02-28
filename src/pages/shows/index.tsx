import React from "react";
import { tw } from "twind";

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

  return (
    <>
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
        <ShowsGroup title="Past Shows" shows={pastShows} />
      </div>
      {user ? <EditVenues /> : null}
    </>
  );
};

export default Shows;
