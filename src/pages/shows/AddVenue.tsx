/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UseMutateFunction } from "react-query";

import { AddButton } from "@/components/lib/AddButton";
import { SubmitButton } from "@/components/lib/SubmitButton";
import { VenuePutData } from "@/lib/venues/types";

import { useVenues } from "./useVenues";

const AddShowVenueForm: React.FC = () => {
  const { addVenue } = useVenues();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [addNew, setAddNew] = useState(false);

  const onSubmit = (data: VenuePutData) => {
    addVenue(data);
    setAddNew(false);
  };

  return (
    <>
      <AddButton clickHandler={() => setAddNew((addNew) => !addNew)} />
      {addNew ? <AddShowVenueForm setAddNew={setAddNew} /> : null}

      <form onSubmit={handleSubmit<VenuePutData>(onSubmit)}>
        <input placeholder="name" {...register("name", { required: true })} />
        <input placeholder="url" {...register("url")} />
        <SubmitButton handleClick={handleSubmit<VenuePutData>(onSubmit)} />
      </form>
    </>
  );
};
