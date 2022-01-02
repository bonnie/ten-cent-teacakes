import { Venue as VenueType } from "@prisma/client";

import React from "react";
import { tw } from "twind";

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

  const venueLink =
    venue.url && !venue.url?.match(/^https?:\/\//)
      ? `http://${venue.url}`
      : venue.url;

  const venueClasses = tw([
    "flex",
    "sm:flex-row",
    // "flex-col",
    "ml-5",
    "my-5",
    "items-center",
  ]);

  return (
    <div className={venueClasses}>
      <div
        className={tw([
          "sm:w-1/2",
          // "w-full",
          "text-xl",
          "font-bold",
          "text-aqua-700",
          "sm:text-right",
          "ml-2",
          "mr-2",
          "sm:mr-0",
        ])}
      >
        {venue.name}
      </div>
      <div className={tw(["order-first", "sm:mx-5", "sm:order-none"])}>
        <EditVenueModal venue={venue} />
        <DeleteVenueModal
          venue={venue}
          disabled={disabled}
          title={disabled ? disabledMessage : "Delete Venue"}
        />
      </div>
      {venueLink ? <a href={venueLink}>{venue.url}</a> : venue.url}
    </div>
  );
};
