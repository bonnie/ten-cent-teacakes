/* eslint-disable react/jsx-props-no-spreading */
import { Formik } from "formik";
import React, { useMemo } from "react";

import { SubmitButton } from "@/components/lib/SubmitButton";
import { VenuePutData } from "@/lib/venues/types";

import { useVenues } from "../hooks/useVenues";

export const AddVenueForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible }) => {
  const { venues, addVenue } = useVenues();
  const venueNames = useMemo(
    () => venues.map((venue) => venue.name.toLowerCase()),
    [venues],
  );

  if (!visible) return null;

  const onSubmit = (data: VenuePutData) => {};

  return (
    <Formik
      initialValues={{ name: "", url: "" }}
      validate={(values) => {
        const errors: { name?: string; url?: string } = {};
        if (!values.name) {
          errors.name = "Venue name is required";
        } else if (
          values.name &&
          venueNames.includes(values.name.toLowerCase())
        ) {
          errors.name = `Venue "${values.name}" already exists`;
        }
        return errors;
      }}
      onSubmit={(values) => {
        if (values.name) {
          addVenue(values);
          setVisible(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <input
            type="text"
            name="url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url}
          />
          <SubmitButton disabled={!!errors.name} />
          {errors.name && touched.name && errors.name}
        </form>
      )}
    </Formik>
  );
};
