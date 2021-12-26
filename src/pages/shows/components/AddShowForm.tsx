// import { Show } from "@prisma/client";

import { Formik } from "formik";
import React, { useState } from "react";

import { EditButtons } from "@/components/lib/EditButtons";
import { Heading } from "@/components/lib/Heading";
import { ShowPutData } from "@/lib/shows";

import { useShows } from "../hooks/useShows";
import { AddVenueForm } from "./AddVenueForm";
import { EditableShowDate } from "./ShowDate";
import { EditableShowVenue } from "./ShowVenue";

type AddShowProps = {
  setAddingShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddShowForm: React.FC<AddShowProps> = ({ setAddingShow }) => {
  const { addShow } = useShows();
  const [showAddVenue, setShowAddVenue] = useState(false);
  const today = new Date();

  const initialValues: ShowPutData = { performAt: today, venueId: undefined };
  return (
    <div>
      <Heading textSize="4xl" align="left" margin={0}>
        Add Show
      </Heading>
      {/* need Formik context (not useFormik) for useField in EditableShowVenue */}
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: { performAt?: string } = {};
          if (!values.performAt) {
            errors.performAt = "Performance date is required";
          }
          return errors;
        }}
        onSubmit={(values: ShowPutData) => {
          addShow(values);
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
            <EditableShowDate performAt={today} />
            <EditableShowVenue
              venueId={undefined}
              setShowAddVenue={setShowAddVenue}
            />
            {props.touched.performAt && props.errors.performAt}
          </form>
        )}
      </Formik>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </div>
  );
};
