// import { Show } from "@prisma/client";

import { Formik } from "formik";
import React, { useState } from "react";

import { EditButtons } from "@/components/lib/EditButtons";
import { Heading } from "@/components/lib/Heading";
import {
  getShowDateFieldValues,
  getShowDateTimeFromForm,
  ShowFormData,
} from "@/lib/shows";

import { useShows } from "../hooks/useShows";
import { useVenues } from "../hooks/useVenues";
import { AddVenueForm } from "./AddVenueForm";
import { EditableShowDate } from "./ShowDate";
import { EditableShowVenue } from "./ShowVenue";

type AddShowProps = {
  setAddingShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddShowForm: React.FC<AddShowProps> = ({ setAddingShow }) => {
  const { addShow } = useShows();
  const { venues } = useVenues();
  const [showAddVenue, setShowAddVenue] = useState(false);

  const { performDate, performTime } = getShowDateFieldValues(new Date());
  const initialValues: ShowFormData = {
    performDate,
    performTime,
    venueId: undefined,
    // venueId: venues[0]?.id ?? undefined,
  };

  return (
    <div>
      <Heading textSize="4xl" align="left" margin={0}>
        Add Show
      </Heading>
      {/* need Formik context (not useFormik) for useField in EditableShowVenue */}
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: { performDate?: string } = {};
          if (!values.performDate) {
            errors.performDate = "Performance date is required";
          }
          return errors;
        }}
        onSubmit={(values: ShowFormData) => {
          console.log(values);
          addShow({
            venueId: values.venueId,
            performAt: getShowDateTimeFromForm(values),
            url: values.url,
          });
          setAddingShow(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <EditButtons
              editing
              setEditing={setAddingShow}
              handleDelete={() => setAddingShow(false)}
            />
            <EditableShowDate
              dateFieldName="performDate"
              timeFieldName="performTime"
            />
            <EditableShowVenue
              venueId={undefined}
              setShowAddVenue={setShowAddVenue}
            />
            {props.touched.performDate && props.errors.performDate}
          </form>
        )}
      </Formik>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </div>
  );
};
