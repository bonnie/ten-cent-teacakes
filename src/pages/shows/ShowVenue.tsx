/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import React from "react";

import { useVenues } from "./useVenues";

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

type EditableShowVenueProps = {
  value: number | undefined;
  // eslint-disable-next-line no-unused-vars
  updateField: (venueId: number) => void;
};

export const EditableShowVenue: React.FC<EditableShowVenueProps> = ({
  value,
  updateField,
}) => {
  const { venues } = useVenues();
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    updateField(Number(event.target.value));
  return (
    <>
      <select onChange={onChange}>
        {venues.map((venue) => {
          const selected = value === venue.id;
          return (
            <option value={venue.id} selected={selected}>
              {venue.name}
            </option>
          );
        })}
      </select>
    </>
  );
};
