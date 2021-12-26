/* eslint-disable react/jsx-props-no-spreading */
import { useFormik } from "formik";
import React from "react";

import { SubmitButton } from "@/components/lib/SubmitButton";
import { VenuePutData } from "@/lib/venues/types";

import { useVenues } from "../hooks/useVenues";

export const AddVenueForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible }) => {
  const { addVenue, venueNamesLower } = useVenues();

  const initialValues: VenuePutData = { name: "", url: "" };
  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues,
      validate: (values) => {
        const errors: { name?: string; url?: string } = {};
        // TODO: repeated code from EditVenues.tsx
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
      onSubmit: (values: VenuePutData) => {
        if (values.name) {
          addVenue(values);
          setVisible(false);
        }
      },
    });

  if (!visible) return null;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="venue name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      <input
        type="text"
        name="url"
        placeholder="venue url"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.url}
      />
      <SubmitButton disabled={!!errors.name} />
      {touched.name && errors.name}
    </form>
  );
};
