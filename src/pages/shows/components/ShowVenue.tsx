/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import { useField } from "formik";
import React from "react";

import { FieldContainer } from "@/components/lib/form/FieldContainer";

import { useVenues } from "../hooks/useVenues";
import { AddVenueModal } from "./venues/EditVenueModal";

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

export const EditableShowVenue: React.FC = () => {
  const { venues } = useVenues();

  const [field] = useField({
    name: "venueId",
    type: "select",
  });

  return (
    <FieldContainer htmlFor="venueId" label="Venue" required>
      <select {...field} className="px-4 py-3 rounded w-full" id="venueId">
        {venues.map((venue) => (
          <option key={venue.id} value={venue.id}>
            {venue.name}
          </option>
        ))}
      </select>
      <div className="mt-2">
        <AddVenueModal />
      </div>
    </FieldContainer>
  );
};
