import React from "react";

import { Heading } from "@/components/lib/Heading";
import { VenueWithShowCount } from "@/lib/venues/types";
import { useVenues } from "@/pages/shows/hooks/useVenues";

import { AddVenueModal } from "./EditVenueModal";
import { Venue } from "./Venue";

export const EditVenues: React.FC = () => {
  const { venues } = useVenues();

  return (
    <div className="mt-5 border-t-2 border-solid border-gray-300 text-center">
      <Heading>Venues</Heading>
      <AddVenueModal />
      {venues
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((venue: VenueWithShowCount) => (
          <Venue key={venue.id} venue={venue} />
        ))}
    </div>
  );
};
