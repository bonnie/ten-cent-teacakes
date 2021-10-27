/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/lib/SubmitButton";
import { VenuePutData } from "@/lib/venues/types";

import { useVenues } from "../hooks/useVenues";

export const AddVenueForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible }) => {
  const { venues, addVenue } = useVenues();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm();
  // console.log("ERRORS", errors);
  // console.log("ISVALID", isValid);

  if (!visible) return null;

  const onSubmit = (data: VenuePutData) => {
    addVenue(data);
    setVisible(false);
  };

  return (
    <form onSubmit={handleSubmit<VenuePutData>(onSubmit)}>
      <input
        placeholder="name"
        {...register("name", {
          required: true,
          validate: (value) => {
            console.log("RUNNING VALIDATE ON", value);
            const invalid = value in venues;
            if (invalid) {
              console.log("SETTING ERROR");
              setError("name", { message: `Venue "${value}" exists` });
            }
            return !invalid;
          },
        })}
      />
      <input placeholder="url" {...register("url")} />
      <SubmitButton disabled={!isValid} />
      {Object.keys(errors).forEach((error) => (
        <span key={error} className="text-red-700">
          {error}: {errors[error]}
        </span>
      ))}
    </form>
  );
};
