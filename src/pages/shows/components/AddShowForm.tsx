import { Show } from "@prisma/client";

import { useFormik } from "formik";
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
  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues,
      validate: (values) => {
        const errors: { performAt?: string } = {};
        if (!values.performAt) {
          errors.performAt = "Performance date is required";
        }
        return errors;
      },
      onSubmit: (values: ShowPutData) => {
        addShow(values);
        setAddingShow(false);
      },
    });

  return (
    <div>
      <Heading textSize="4xl" align="left" margin={0}>
        Add Show
      </Heading>
      <form onSubmit={handleSubmit}>
        <EditButtons
          editing
          setEditing={setAddingShow}
          // handleSave={(e) => {e.preventDefault(); formRef?.current?.submit()}}
          handleDelete={() => setAddingShow(false)}
        />
        <EditableShowDate performAt={today} />
        <EditableShowVenue
          venueId={undefined}
          setShowAddVenue={setShowAddVenue}
        />
      </form>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </div>
  );
};
