import dayjs from "dayjs";
import { FormikProps } from "formik";
import React from "react";

import { TextInput } from "@/components/lib/form/TextInput";
import { EditItemModal } from "@/components/lib/modals/EditItemModal";
import { ShowFormData, ShowWithVenue } from "@/lib/shows/types";

import { useShows } from "../hooks/useShows";
import { useVenues } from "../hooks/useVenues";
import { EditableShowVenue } from "./ShowVenue";
// import { AddVenueForm } from "./venues/EditVenueModal";

export const getShowDateFieldValues = (
  performAt: Date,
): { performDate: string; performTime: string } => ({
  performDate: dayjs(performAt).format("YYYY-MM-DD"),
  performTime: dayjs(performAt).format("HH:mm"),
});

export const getShowDateTimeFromForm = (values: ShowFormData): Date => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  return dayjs
    .tz(`${values.performDate} ${values.performTime}`, timeZone)
    .toDate();
};

const EditShowForm: React.FC<{
  props: FormikProps<ShowFormData>;
}> = ({ props }) => (
  <>
    <form onSubmit={props.handleSubmit}>
      <TextInput name="performDate" label="Performance date" type="date" />
      <TextInput name="performTime" label="Performance time" type="time" />
      {/* TODO update selected show when new show is added (not simple) */}
      <EditableShowVenue />
      <TextInput
        name="url"
        label="URL for show (if different from venue URL)"
        placeholderText="www.example.com"
        prefix="http://"
        required={false}
        type="url"
      />
    </form>
  </>
);

const validate = (values: ShowFormData) => {
  const errors: { performDate?: string; venueId?: string } = {};
  if (!values.performDate) {
    errors.performDate = "Performance date is required";
  }
  if (!values.venueId) {
    errors.venueId =
      'Venue is required; use "TBD" or "Private Event" if unknown';
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

  const onSubmit = (values: ShowFormData) => {
    if (!values.venueId) {
      return;
    }
    addShow({
      venueId: values.venueId,
      performAt: getShowDateTimeFromForm(values),
      url: values.url ?? "",
    });
  };

  const formikConfig = { initialValues, validate, onSubmit };

  return (
    <EditItemModal
      title="Add Show"
      itemName="show"
      FormFields={EditShowForm}
      formikConfig={formikConfig}
      buttonType="add"
    />
  );
};

export const EditShowModal: React.FC<{ show: ShowWithVenue }> = ({ show }) => {
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
      title={`Edit Show at ${show.venue.name} on ${dayjs(show.performAt).format(
        "MMM D, YYYY, hh:mm a",
      )}`}
      itemName="show"
      FormFields={EditShowForm}
      formikConfig={formikConfig}
    />
  );
};
