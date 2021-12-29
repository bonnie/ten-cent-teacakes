/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from "@prisma/client";

import React from "react";

import { Heading } from "@/components/lib/Heading";

import { useVenues } from "../../hooks/useVenues";
import { AddVenueModal } from "./EditVenueModal";
import { Venue } from "./Venue";

export const EditVenues: React.FC = () => {
  const { venues } = useVenues();

  return (
    <div className="mt-5 border-t-2 border-solid border-gray-300">
      <Heading>Venues</Heading>
      <AddVenueModal />
      {venues
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((venue: VenueType) => (
          <Venue key={venue.id} venue={venue} />
        ))}
    </div>
  );
};
