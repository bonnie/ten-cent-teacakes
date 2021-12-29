import React from "react";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { ShowWithVenue } from "@/lib/shows";

import { EditShowModal } from "./EditShowModal";
import { ShowDate } from "./ShowDate";
import { DisplayShowVenue } from "./ShowVenue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => {
  const { user } = useWhitelistUser();

  return (
    <div>
      {user ? <EditShowModal show={show} /> : null}
      <ShowDate performAt={show.performAt} />
      <DisplayShowVenue
        venue={show.venue}
        rawUrl={show.url || show.venue.url}
      />
    </div>
  );
};
