/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { EditButtons } from "@/components/lib/EditButtons";
import { ShowWithVenue } from "@/lib/api";
import { ShowPatchData, ShowPutData } from "@/pages/api/shows/queries";

import { formattedPerformAt } from "./utils";
import { Venue } from "./Venue";

type EditableNewShowProps = {
  setAddingShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditableNewShow: React.FC<EditableNewShowProps> = ({
  setAddingShow,
}) => {
  const newShow: ShowPutData = {
    performAt: new Date(),
  };
  const cancelAddingShow = () => setAddingShow(false);
  const handleSave = (data: ShowPutData) => {
    // TODO: server call to save new show
  };
  return (
    <EditableShow
      show={newShow}
      startWithEditing
      handleCancel={cancelAddingShow}
      handleDelete={cancelAddingShow}
      handleSave={handleSave}
    />
  );
};

type EditableExistingShowProps = {
  show: ShowWithVenue;
};

export const EditableExistingShow: React.FC<EditableExistingShowProps> = ({
  show,
}) => {
  const handleDelete = () => {
    // TODO server call to delete show
  };
  const handleSave = (data: ShowPatchData) => {
    // TODO: server call to save show
  };
  return (
    <EditableShow
      show={show}
      startWithEditing={false}
      handleCancel={undefined}
      handleDelete={handleDelete}
      handleSave={handleSave}
    />
  );
};

type EditShowProps = {
  show: ShowWithVenue | ShowPutData;
  startWithEditing: boolean;
  handleCancel: (() => void) | undefined;
  handleSave: ((data: ShowPatchData) => void) | ((data: ShowPutData) => void);
  handleDelete: () => void;
};

const EditableShow: React.FC<EditShowProps> = ({
  show,
  startWithEditing,
  handleCancel,
  handleSave,
  handleDelete,
}) => {
  const [editing, setEditing] = useState(startWithEditing);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const stopEditing = () => {
    setEditing(false);
  };
  const venue = "venue" in show ? show.venue : undefined;

  return (
    <div>
      <p>
        <form onSubmit={handleSubmit(handleSave)}>
          <EditButtons
            onCancel={handleCancel ?? stopEditing}
            onSave={() => handleSubmit(handleSave)}
            onDelete={handleDelete}
          />
          {editing ? (
            <input
              type="datetime-local"
              defaultValue={show.performAt.toLocaleDateString()}
              {...(register("performAt"), { required: true })}
            />
          ) : (
            formattedPerformAt(show.performAt)
          )}
          <Venue venue={venue} editing={editing} />
        </form>
      </p>
    </div>
  );
};
