import { useFormik } from "formik";
import React, { useState } from "react";

import { EditButtons } from "@/components/lib/EditButtons";
import {
  getShowDateFieldValues,
  getShowDateTimeFromForm,
  ShowFormData,
  ShowWithVenue,
} from "@/lib/shows";

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
    <EditableShowDate dateFieldName="performDate" timeFieldName="performTime" />{" "}
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

  const { performDate, performTime } = getShowDateFieldValues(show.performAt);
  const initialValues: ShowFormData = {
    performDate,
    performTime,
    venueId: show.venueId,
    url: show.url ?? undefined,
  };

  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: (values: ShowFormData) => {
        setEditing(false);
        updateShow({
          id: show.id,
          data: {
            venueId: values.venueId,
            performAt: getShowDateTimeFromForm(values),
            url: values.url,
          },
        });
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
