import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { Section } from "@/components/lib/Style/Section";
import { VenueWithShowCount } from "@/lib/venues/types";

import { AddVenueModal } from "./EditVenueModal";
import { Venue } from "./Venue";

export const EditVenues: React.FC<{ venues: Array<VenueWithShowCount> }> = ({
  venues,
}) => (
  <Section className={tw(["text-center"])}>
    <Heading>Venues</Heading>
    <AddVenueModal />
    {venues
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((venue: VenueWithShowCount) => (
        <Venue key={venue.id} venue={venue} />
      ))}
  </Section>
);
