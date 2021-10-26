/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { useVenues } from "../hooks/useVenues";

export const DisplayShowVenue: React.FC<{ venue: VenueType }> = ({ venue }) => {
  const { url } = venue;
  if (!url) return <span>{venue.name}</span>;

  return (
    <a
      href={url}
      aria-label={venue.name}
      title={venue.name}
      color="primary"
      target="_blank"
      rel="noreferrer"
    >
      {venue.name}
    </a>
  );
};

type VenueSelectProps = {
  value: number | undefined;
  // eslint-disable-next-line no-unused-vars
  updateField: (venueId: number) => void;
};

export const EditableShowVenue: React.FC<{
  venueId: number | undefined;
  register: UseFormRegister<FieldValues>;
}> = ({ venueId, register }) => {
  const { venues } = useVenues();
  return (
    <select {...register("venueId")} defaultValue={venueId}>
      {venues.map((venue) => (
        <option key={venue.id} value={venue.id}>
          {venue.name}
        </option>
      ))}
    </select>
  );
};
