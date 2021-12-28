import { Show } from "@prisma/client";

import dayjs from "dayjs";
import { Formik } from "formik";
import React, { useState } from "react";

import { EditItemModal } from "@/components/lib/EditItemModal";
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
  initialValues: ShowFormData;
  handleSubmit: (values: ShowFormData) => void;
}> = ({ initialValues, handleSubmit }) => {
  const [showAddVenue, setShowAddVenue] = useState(false);
  return (
    <>
      {/* need Formik context (not useFormik) for useField in EditableShowVenue */}
      <Formik
        initialValues={initialValues}
        validate={(values: ShowFormData) => {
          const errors: { performDate?: string } = {};
          if (!values.performDate) {
            errors.performDate = "Performance date is required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <EditableShowDate
              dateFieldName="performDate"
              timeFieldName="performTime"
            />
            <EditableShowVenue
              venueId={initialValues.venueId}
              setShowAddVenue={setShowAddVenue}
            />
            {props.touched.performDate && props.errors.performDate}
          </form>
        )}
      </Formik>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </>
  );
};

export const AddShowModal: React.FC = () => {
  const { venues } = useVenues();
  const { addShow } = useShows();

  const { performDate, performTime } = getShowDateFieldValues(new Date());

  const initialValues: ShowFormData = {
    performDate,
    performTime,
    venueId: venues[0]?.id ?? undefined,
  };

  const handleSubmit = (values: ShowFormData) =>
    addShow({
      venueId: values.venueId,
      performAt: getShowDateTimeFromForm(values),
      url: values.url,
    });

  return (
    <EditItemModal
      title="Add Show"
      form={
        <EditShowForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
        />
      }
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

  const handleSubmit = (values: ShowFormData) => {
    updateShow({
      id: show.id,
      data: {
        venueId: values.venueId,
        performAt: getShowDateTimeFromForm(values),
        url: values.url,
      },
    });
  };

  return (
    <EditItemModal
      title="Edit Show"
      form={
        <EditShowForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
        />
      }
    />
  );
};
