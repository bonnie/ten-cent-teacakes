/* eslint-disable react/jsx-props-no-spreading */
import { Venue } from ".prisma/client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/lib/Button";
import { EditButtons } from "@/components/lib/EditButtons";
import { Heading } from "@/components/lib/Heading";

import { useVenues } from "../hooks/useVenues";

const EditableVenue: React.FC<{ venue: Venue }> = ({ venue }) => {
  const [editing, setEditing] = useState(false);
  const { deleteVenue, updateVenue } = useVenues();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleDelete = () => {
    setEditing(false);
    deleteVenue(venue.id);
  };
  const handleSave = () => {
    handleSubmit((data) => updateVenue({ id: venue.id, data }));
  };

  return (
    <div>
      <EditButtons
        editing={editing}
        setEditing={setEditing}
        handleDelete={handleDelete}
        handleSave={handleSave}
      />
      {editing ? (
        <input
          {...register("name", { required: true })}
          placeholder="venue name"
          defaultValue={venue.name}
        />
      ) : (
        venue.name
      )}
      {editing ? (
        <input
          {...register("url", { required: true })}
          placeholder="venue url"
          defaultValue={venue.url ?? ""}
        />
      ) : (
        venue.url
      )}
    </div>
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
              <EditableVenue venue={venue} />
            ))}
        </>
      )}
    </>
  );
};

// TODO: implementing venue update
// TODO: implement add venue for this component
