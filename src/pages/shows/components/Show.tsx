import { useFormik } from "formik";
import React, { useState } from "react";

import { EditButtons } from "@/components/lib/EditButtons";
import { ShowPatchData, ShowWithVenue } from "@/lib/shows";

import { useShows } from "../hooks/useShows";
import { AddVenueForm } from "./AddVenueForm";
import { EditableShowDate, ShowDate } from "./ShowDate";
import { DisplayShowVenue, EditableShowVenue } from "./ShowVenue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => (
  <span>
    <ShowDate performAt={show.performAt} />
    <DisplayShowVenue venue={show.venue} />
  </span>
);

type ShowWithInputsProps = {
  show: ShowWithVenue;
  setShowAddVenue: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowWithInputs: React.FC<ShowWithInputsProps> = ({
  show,
  setShowAddVenue,
}) => (
  <>
    <EditableShowDate performAt={show.performAt} />
    <EditableShowVenue
      venueId={show.venueId}
      setShowAddVenue={setShowAddVenue}
    />
  </>
);

export const EditableShow: React.FC<{ show: ShowWithVenue }> = ({ show }) => {
  const [editing, setEditing] = useState(false);
  const { updateShow, deleteShow } = useShows();
  const [showAddVenue, setShowAddVenue] = useState(false);

  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues: { performAt: show.performAt, venueId: show.venueId },
      onSubmit: (values: ShowPatchData) => {
        setEditing(false);
        updateShow({ id: show.id, data: values });
      },
    });

  const handleDelete = () => {
    setEditing(false);
    deleteShow(show.id);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <EditButtons
          editing={editing}
          setEditing={setEditing}
          handleDelete={handleDelete}
        />
        {editing ? (
          <ShowWithInputs show={show} setShowAddVenue={setShowAddVenue} />
        ) : (
          <Show show={show} />
        )}
      </form>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </>
  );
};
