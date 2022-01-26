import React from "react";

import { Heading } from "@/components/lib/Style/Heading";
import { Section } from "@/components/lib/Style/Section";
import { useVenues } from "@/lib/shows/hooks/useVenues";
import { VenueWithShowCount } from "@/lib/venues/types";

import { AddVenueModal } from "./EditVenueModal";
import { Venue } from "./Venue";

export const EditVenues: React.FC = () => {
  const { venues } = useVenues();

  return (
    <Section className="text-center">
      <Heading>Venues</Heading>
      <AddVenueModal />
      {venues
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((venue: VenueWithShowCount) => (
          <Venue key={venue.id} venue={venue} />
        ))}
    </Section>
  );
};
