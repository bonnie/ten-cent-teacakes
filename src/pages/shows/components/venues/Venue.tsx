import React from "react";
import { tw } from "twind";

import { VenueWithShowCount } from "@/lib/venues/types";

import { DeleteVenueModal } from "./DeleteVenueModal";
import { EditVenueModal } from "./EditVenueModal";

export const Venue: React.FC<{ venue: VenueWithShowCount }> = ({ venue }) => {
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
        <DeleteVenueModal venue={venue} />
      </div>
      {venueLink ? <a href={venueLink}>{venue.url}</a> : venue.url}
    </div>
  );
};
