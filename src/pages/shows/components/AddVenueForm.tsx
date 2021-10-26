/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiSave } from "react-icons/bi";
import { UseMutateFunction } from "react-query";

import { AddButton } from "@/components/lib/AddButton";
import { SubmitButton } from "@/components/lib/SubmitButton";
import { VenuePutData } from "@/lib/venues/types";

import { useVenues } from "../hooks/useVenues";

export const AddVenueForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible }) => {
  const { addVenue } = useVenues();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!visible) return null;

  const onSubmit = (data: VenuePutData) => {
    console.log("SUBMITTING");
    addVenue(data);
    setVisible(false);
  };

  return (
    <form onSubmit={handleSubmit<VenuePutData>(onSubmit)}>
      <input placeholder="name" {...register("name", { required: true })} />
      <input placeholder="url" {...register("url")} />
      <SubmitButton />
    </form>
  );
};
