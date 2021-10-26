/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import React, { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { useVenues } from "../hooks/useVenues";
import { AddVenueForm } from "./AddVenueForm";

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
  register: UseFormRegister<FieldValues>;
  setShowAddVenue: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ venueId, register, setShowAddVenue }) => {
  const { venues } = useVenues();
  const addNewText = "Add new...";
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setShowAddVenue(event.target.value === addNewText);
  return (
    <>
      <select {...register("venueId", { onChange })} defaultValue={venueId}>
        {venues.map((venue) => (
          <option key={venue.id} value={venue.id}>
            {venue.name}
          </option>
        ))}
        <option value={undefined}>Add new...</option>
      </select>
    </>
  );
};
