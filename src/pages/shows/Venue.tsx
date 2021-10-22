/* eslint-disable react/jsx-props-no-spreading */
import { Venue as VenueType } from ".prisma/client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UseMutateFunction } from "react-query";

import { AddButton } from "@/components/lib/AddButton";
import { SubmitButton } from "@/components/lib/SubmitButton";
import { VenuePutData } from "@/pages/api/venues/queries";

import { useVenues } from "./useVenues";

export const DisplayVenue: React.FC<{ venue: VenueType }> = ({ venue }) => {
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

type AddVenueFormProps = {
  setAddNew: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddVenueForm: React.FC<AddVenueFormProps> = ({ setAddNew }) => {
  const { addVenue } = useVenues();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: VenuePutData) => {
    addVenue(data);
    setAddNew(false);
  };

  return (
    <form onSubmit={handleSubmit<VenuePutData>(onSubmit)}>
      <input placeholder="name" {...register("name", { required: true })} />
      <input placeholder="url" {...register("url")} />
      <SubmitButton handleClick={handleSubmit<VenuePutData>(onSubmit)} />
    </form>
  );
};

type EditableVenueProps = {
  venue: VenueType | undefined;
};

export const EditableVenue: React.FC<EditableVenueProps> = ({ venue }) => {
  const { venues } = useVenues();
  const [addNew, setAddNew] = useState(false);
  return (
    <>
      <select>
        {venues.map((venue) => (
          <option value={venue.id}>venue.name</option>
        ))}
      </select>
      <AddButton clickHandler={() => setAddNew((addNew) => !addNew)} />
      {addNew ? <AddVenueForm setAddNew={setAddNew} /> : null}
    </>
  );
};
