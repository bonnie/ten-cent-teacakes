/* eslint-disable react/jsx-props-no-spreading */
import { Venue } from "@prisma/client";

import { FormikProps } from "formik";
import React from "react";

import { TextInput } from "@/components/lib/form/TextInput";
import { EditItemModal } from "@/components/lib/modals/EditItemModal";
import { VenuePutData } from "@/lib/venues/types";

import { useVenues } from "../../hooks/useVenues";

export const EditVenueForm: React.FC<{
  props: FormikProps<VenuePutData>;
}> = ({ props }) => (
  <form onSubmit={props.handleSubmit}>
    <TextInput name="name" label="Venue Name" required />
    <TextInput
      name="url"
      label="Venue URL"
      placeholderText="www.example.com"
      prefix="http://"
      required={false}
      type="url"
    />
  </form>
);

export const AddVenueModal: React.FC = () => {
  const { addVenue, venueFormValidation } = useVenues();

  const initialValues: VenuePutData = { name: "", url: "" };
  const onSubmit = (values: VenuePutData) => {
    addVenue(values);
  };

  const formikConfig = {
    initialValues,
    validate: venueFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Add Venue"
      FormFields={EditVenueForm}
      formikConfig={formikConfig}
      buttonType="add"
    />
  );
};

export const EditVenueModal: React.FC<{ venue: Venue }> = ({ venue }) => {
  const { updateVenue, venueFormValidation } = useVenues();

  const initialValues: VenuePutData = {
    name: venue.name,
    url: venue.url ?? undefined,
  };

  const onSubmit = (values: VenuePutData) => {
    updateVenue({
      id: venue.id,
      data: values,
    });
  };

  const formikConfig = {
    initialValues,
    validate: venueFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Edit Venue"
      FormFields={EditVenueForm}
      formikConfig={formikConfig}
      buttonType="edit"
    />
  );
};
