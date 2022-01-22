/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import { useField } from "formik";
import React from "react";

import { FieldContainer } from "@/components/lib/form/FieldContainer";
import { Keyword } from "@/components/lib/Style/Keyword";
import { LinkKeyword } from "@/components/lib/Style/LinkKeyword";

import { useVenues } from "../hooks/useVenues";
import { AddVenueModal } from "./venues/EditVenueModal";

export const DisplayShowVenue: React.FC<{
  venue: VenueType;
  rawUrl: string | null;
}> = ({ venue, rawUrl }) => {
  if (!rawUrl) return <Keyword className="text-xl">{venue.name}</Keyword>;

  const url = rawUrl.search(/^https?:\/\//) === 0 ? rawUrl : `http://${rawUrl}`;
  return (
    <span aria-label={venue.name} title={venue.name}>
      <LinkKeyword href={url} className="text-xl">
        {venue.name}
      </LinkKeyword>
    </span>
  );
};

export const EditableShowVenue: React.FC = () => {
  const { venues } = useVenues();

  const [field] = useField({
    name: "venueId",
    type: "select",
  });

  return (
    <FieldContainer
      htmlFor="venueId"
      label="Venue"
      required
      fieldName="venueId"
    >
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
