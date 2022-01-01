import React from "react";
import { tw } from "twind";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { ShowWithVenue } from "@/lib/shows";

import { DeleteShowModal } from "./DeleteShowModal";
import { EditShowModal } from "./EditShowModal";
import { ShowDate } from "./ShowDate";
import { DisplayShowVenue } from "./ShowVenue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => {
  const { user } = useWhitelistUser();

  const showClasses = tw(["flex", "sm:flex-row", "flex-col", "ml-5", "my-5"]);

  return (
    <div className={showClasses}>
      {user ? (
        <>
          <EditShowModal show={show} />
          <DeleteShowModal show={show} />
        </>
      ) : null}
      <ShowDate performAt={show.performAt} />
      <DisplayShowVenue
        venue={show.venue}
        rawUrl={show.url || show.venue.url}
      />
    </div>
  );
};
