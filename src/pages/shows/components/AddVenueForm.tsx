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
  const { addVenue, venueFormValidation } = useVenues();

  const initialValues: VenuePutData = { name: "", url: "" };
  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues,
      validate: venueFormValidation,
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
      <SubmitButton disabled={Object.keys(errors).length > 0} />
      {(touched.name && errors.name) || (touched.url && errors.url)}
    </form>
  );
};
