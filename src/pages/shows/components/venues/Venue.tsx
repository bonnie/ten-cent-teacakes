import { Venue as VenueType } from "@prisma/client";

import React from "react";

import { DeleteVenueModal } from "./DeleteVenueModal";
import { EditVenueModal } from "./EditVenueModal";

export const Venue: React.FC<{ venue: VenueType; showCount: number }> = ({
  venue,
  showCount,
}) => {
  const disabled = !!showCount;
  const disabledMessage = `${venue.name} is associated with ${showCount} show${
    showCount > 1 ? "s" : ""
  } and can't be deleted`;
  return (
    <div className="flex items-center">
      <div className="w-5/12 text-right">
        <EditVenueModal venue={venue} />
        <DeleteVenueModal
          venue={venue}
          disabled={disabled}
          title={disabled ? disabledMessage : "Delete Venue"}
        />
      </div>
      <div className="text-xl font-bold text-aqua-700 w-1/6 text-left ml-2">
        {venue.name}
      </div>
      <div className="w-1/3 text-left">{venue.url}</div>
    </div>
  );
};
