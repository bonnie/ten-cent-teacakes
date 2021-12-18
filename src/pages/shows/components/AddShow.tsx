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

export const AddShow: React.FC<AddShowProps> = ({ setAddingShow }) => {
  const { addShow } = useShows();
  const [showAddVenue, setShowAddVenue] = useState(false);
  const handleSave = (data: ShowPutData) => {
    addShow(data);
  };
  const today = new Date();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();
  return (
    <div>
      <Heading textSize="4xl" align="left" margin={0}>
        Add Show
      </Heading>
      <Formik
      initialValues={{performAt: today, venueId: undefined}}
      >
      <form onSubmit={handleSubmit(handleSave)}>
        <EditButtons
          editing
          setEditing={setAddingShow}
          // handleSave={(e) => {e.preventDefault(); formRef?.current?.submit()}}
          handleDelete={() => setAddingShow(false)}
        />
        <EditableShowDate control={control} performAt={today} />
        <EditableShowVenue
          register={register}
          venueId={undefined}
          setShowAddVenue={setShowAddVenue}
        />
      </form>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </div>
  );
};
