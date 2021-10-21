import { Venue as VenueType } from ".prisma/client";

import React from "react";

import { VenueData } from "@/pages/api/shows/queries";

import { useVenues } from "./useVenues";

type VenueProps = {
  venue?: VenueType | undefined; // for venues alread in db
  venueData?: VenueData | undefined; // for venues that don't exist in the db yet
  editing?: boolean;
};

export const Venue: React.FC<VenueProps> = ({ venue, venueData, editing }) => {
  const { venues } = useVenues();
  const venueName = venue?.name ?? venueData?.name;
  if (!editing) {
    const url = venue?.url ?? venueData?.url;
    if (venueName && url) {
      return (
        <a
          href={url}
          aria-label={venueName}
          title={venueName}
          color="primary"
          target="_blank"
          rel="noreferrer"
        >
          {venueName}
        </a>
      );
    }
    if (venueName) return <span>{venueName}</span>;
    return null;
  }
  // editing
  // TODO: put a react-hooks-form dropdown here
  return <span>editable!</span>;
};

Venue.defaultProps = {
  venue: undefined,
  venueData: undefined,
  editing: false,
};
