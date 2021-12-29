import { Venue as VenueType } from "@prisma/client";

import React from "react";

import { DeleteVenueModal } from "./DeleteVenueModal";
import { EditVenueModal } from "./EditVenueModal";

export const Venue: React.FC<{ venue: VenueType }> = ({ venue }) => (
  <div>
    <EditVenueModal venue={venue} />
    <DeleteVenueModal venue={venue} />
    {venue.name} {venue.url}
  </div>
);
