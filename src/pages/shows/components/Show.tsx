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
import { EditableShowDate, ShowDate } from "./ShowDate";
import { DisplayShowVenue, EditableShowVenue } from "./ShowVenue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => (
  <p>
    <ShowDate performAt={show.performAt} />
    <DisplayShowVenue venue={show.venue} />
  </p>
);

type ShowWithInputsProps = {
  show: ShowWithVenue;
  control: Control;
  register: UseFormRegister<FieldValues>;
};

const ShowWithInputs: React.FC<ShowWithInputsProps> = ({
  show,
  control,
  register,
}) => (
  <>
    <EditableShowDate control={control} performAt={show.performAt} />
    <EditableShowVenue register={register} venueId={show.venueId} />
  </>
);

export const EditableShow: React.FC<{ show: ShowWithVenue }> = ({ show }) => {
  const [editing, setEditing] = useState(false);
  const { updateShow, deleteShow } = useShows();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSave = (data: ShowPatchData) => updateShow({ id: show.id, data });
  const handleDelete = () => deleteShow(show.id);

  return (
    <p>
      <form onSubmit={handleSubmit(handleSave)}>
        <EditButtons
          editing={editing}
          setEditing={setEditing}
          handleSave={() => handleSubmit(handleSave)}
          handleDelete={handleDelete}
        />
        {editing ? (
          <ShowWithInputs show={show} control={control} register={register} />
        ) : (
          <Show show={show} />
        )}
      </form>
    </p>
  );
};
