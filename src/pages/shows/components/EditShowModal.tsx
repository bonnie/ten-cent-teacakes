import { Show } from "@prisma/client";

import dayjs from "dayjs";
import { FormikProps } from "formik";
import React, { useState } from "react";

import { EditItemModal } from "@/components/lib/EditItemModal";
import { TextInput } from "@/components/lib/form/TextInput";
import { ShowFormData } from "@/lib/shows";

import { useShows } from "../hooks/useShows";
import { useVenues } from "../hooks/useVenues";
import { AddVenueForm } from "./EditVenueForm";
import { EditableShowDate } from "./ShowDate";
import { EditableShowVenue } from "./ShowVenue";

export const getShowDateFieldValues = (
  performAt: Date,
): { performDate: string; performTime: string } => ({
  performDate: dayjs(performAt).format("YYYY-MM-DD"),
  performTime: dayjs(performAt).format("HH:MM"),
});

export const getShowDateTimeFromForm = (values: ShowFormData): Date => {
  const timeZone = "America/Los_Angeles";

  return dayjs
    .tz(`${values.performDate} ${values.performTime}`, timeZone)
    .toDate();
};

const EditShowForm: React.FC<{
  props: FormikProps<ShowFormData>;
}> = ({ props }) => {
  const [showAddVenue, setShowAddVenue] = useState(false);
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <EditableShowDate
          dateFieldName="performDate"
          timeFieldName="performTime"
        />
        <EditableShowVenue
          venueId={props.values.venueId}
          setShowAddVenue={setShowAddVenue}
        />
        <TextInput
          name="url"
          label="Show URL (if different from venue URL)"
          placeholderText="www.example.com"
          prefix="http://"
          required={false}
          type="url"
        />
        {props.touched.performDate && props.errors.performDate}
      </form>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </>
  );
};

const validate = (values: ShowFormData) => {
  const errors: { performDate?: string } = {};
  if (!values.performDate) {
    errors.performDate = "Performance date is required";
  }
  return errors;
};

export const AddShowModal: React.FC = () => {
  const { venues } = useVenues();
  const { addShow } = useShows();

  const { performDate, performTime } = getShowDateFieldValues(new Date());

  const initialValues: ShowFormData = {
    performDate,
    performTime,
    venueId: venues[0]?.id ?? undefined,
    url: "",
  };

  const onSubmit = (values: ShowFormData) =>
    addShow({
      venueId: values.venueId,
      performAt: getShowDateTimeFromForm(values),
      url: values.url ?? "",
    });

  const formikConfig = { initialValues, validate, onSubmit };

  return (
    <EditItemModal
      title="Add Show"
      FormFields={EditShowForm}
      formikConfig={formikConfig}
    />
  );
};

export const EditShowModal: React.FC<{ show: Show }> = ({ show }) => {
  const { updateShow } = useShows();

  const { performDate, performTime } = getShowDateFieldValues(show.performAt);
  const initialValues: ShowFormData = {
    performDate,
    performTime,
    venueId: show.venueId,
    url: show.url ?? undefined,
  };

  const onSubmit = (values: ShowFormData) => {
    updateShow({
      id: show.id,
      data: {
        venueId: values.venueId,
        performAt: getShowDateTimeFromForm(values),
        url: values.url,
      },
    });
  };

  const formikConfig = { initialValues, validate, onSubmit };

  return (
    <EditItemModal
      title="Edit Show"
      FormFields={EditShowForm}
      formikConfig={formikConfig}
    />
  );
};
