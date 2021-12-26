/* eslint-disable react/jsx-props-no-spreading */
import { Venue } from ".prisma/client";

import { useFormik } from "formik";
import React, { useState } from "react";

import { Button } from "@/components/lib/Button";
import { EditButtons } from "@/components/lib/EditButtons";
import { Heading } from "@/components/lib/Heading";
import { VenuePatchData } from "@/lib/venues";

import { useVenues } from "../hooks/useVenues";

const EditableVenue: React.FC<{ venue: Venue }> = ({ venue }) => {
  const [editing, setEditing] = useState(false);
  const { deleteVenue, updateVenue, venueNamesLower } = useVenues();

  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues: { name: venue.name, url: venue.url ?? undefined },
      validate: (values) => {
        const errors: { name?: string } = {};
        // TODO: repeated code from AddVenueForm.tsx
        if (!values.name) {
          errors.name = "Venue name is required";
        } else if (
          values.name &&
          venueNamesLower.includes(values.name.toLowerCase())
        ) {
          errors.name = `Venue "${values.name}" already exists`;
        }
        return errors;
      },
      onSubmit: (values: VenuePatchData) =>
        updateVenue({ id: venue.id, data: values }),
    });

  const handleDelete = () => {
    setEditing(false);
    deleteVenue(venue.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <EditButtons
        editing={editing}
        setEditing={setEditing}
        handleDelete={handleDelete}
      />
      {editing ? (
        <input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
      ) : (
        venue.name
      )}
      {editing ? (
        <input
          type="text"
          name="url"
          placeholder="venue url"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.url}
        />
      ) : (
        venue.url
      )}
    </form>
  );
};

export const EditVenues: React.FC = () => {
  const [editing, updateEditing] = useState(false);
  const { venues } = useVenues();

  return (
    <>
      <Button
        contents={editing ? "Hide Venues" : "Edit Venues"}
        clickHandler={() => updateEditing((editing) => !editing)}
      />
      {!editing ? null : (
        <>
          <Heading textSize="4xl" align="left" margin={0}>
            Edit Venues
          </Heading>
          {venues
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((venue) => (
              <EditableVenue key={venue.id} venue={venue} />
            ))}
        </>
      )}
    </>
  );
};
