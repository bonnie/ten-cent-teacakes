/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from "@prisma/client";

import React from "react";

import { Heading } from "@/components/lib/Heading";
import { useShows } from "@/pages/shows/hooks/useShows";
import { useVenues } from "@/pages/shows/hooks/useVenues";

import { AddVenueModal } from "./EditVenueModal";
import { Venue } from "./Venue";

export const EditVenues: React.FC = () => {
  const { venues } = useVenues();
  const { showCountPerVenue } = useShows();

  return (
    <div className="mt-5 border-t-2 border-solid border-gray-300 text-center">
      <Heading>Venues</Heading>
      <AddVenueModal />
      {venues
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((venue: VenueType) => (
          <Venue
            key={venue.id}
            venue={venue}
            showCount={showCountPerVenue[venue.id] ?? 0}
          />
        ))}
    </div>
  );
};
