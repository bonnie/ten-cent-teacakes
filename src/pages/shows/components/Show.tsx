import React, { useState } from "react";
import {
  Control,
  FieldValues,
  useForm,
  UseFormRegister,
} from "react-hook-form";

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
  control: Control;
  register: UseFormRegister<FieldValues>;
  setShowAddVenue: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowWithInputs: React.FC<ShowWithInputsProps> = ({
  show,
  control,
  register,
  setShowAddVenue,
}) => (
  <>
    <EditableShowDate control={control} performAt={show.performAt} />
    <EditableShowVenue
      register={register}
      venueId={show.venueId}
      setShowAddVenue={setShowAddVenue}
    />
  </>
);

export const EditableShow: React.FC<{ show: ShowWithVenue }> = ({ show }) => {
  const [editing, setEditing] = useState(false);
  const { updateShow, deleteShow } = useShows();
  const [showAddVenue, setShowAddVenue] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSave = (data: ShowPatchData) => {
    setEditing(false);
    updateShow({ id: show.id, data });
  };
  const handleDelete = () => {
    setEditing(false);
    deleteShow(show.id);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSave)}>
        <EditButtons
          editing={editing}
          setEditing={setEditing}
          handleDelete={handleDelete}
        />
        {editing ? (
          <ShowWithInputs
            show={show}
            control={control}
            register={register}
            setShowAddVenue={setShowAddVenue}
          />
        ) : (
          <Show show={show} />
        )}
      </form>
      <AddVenueForm visible={showAddVenue} setVisible={setShowAddVenue} />
    </>
  );
};
