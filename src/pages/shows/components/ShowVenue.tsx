/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import { useField } from "formik";
import React, { useEffect } from "react";

import { useVenues } from "../hooks/useVenues";

export const DisplayShowVenue: React.FC<{
  venue: VenueType;
  rawUrl: string | null;
}> = ({ venue, rawUrl }) => {
  if (!rawUrl) return <span>{venue.name}</span>;

  const url = rawUrl.search(/^https?:\/\//) === 0 ? rawUrl : `http://${rawUrl}`;
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
  useEffect(() => {
    setShowAddVenue(venues.length === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewText = "Add new...";
  const [field] = useField({
    name: "venueId",
    type: "select",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    field.onChange(event);
    setShowAddVenue(event.target.value === addNewText);
  };

  return (
    <select {...field} onChange={handleChange} defaultValue={venueId}>
      {venues.map((venue) => (
        <option key={venue.id} value={venue.id}>
          {venue.name}
        </option>
      ))}
      <option value={undefined}>{addNewText}</option>
    </select>
  );
};
