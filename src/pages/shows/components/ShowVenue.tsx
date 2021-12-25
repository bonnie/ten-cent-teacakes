/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import { useField } from "formik";
import React from "react";

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

export const EditableShowVenue: React.FC<{
  venueId: number | undefined;
  setShowAddVenue: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ venueId, setShowAddVenue }) => {
  const { venues } = useVenues();
  const addNewText = "Add new...";
  const [field] = useField({
    name: "venueId",
    type: "select",
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
      setShowAddVenue(event.target.value === addNewText),
  });

  return (
    <select {...field} defaultValue={venueId}>
      {venues.map((venue) => (
        <option key={venue.id} value={venue.id}>
          {venue.name}
        </option>
      ))}
      <option value={undefined}>Add new...</option>
    </select>
  );
};
