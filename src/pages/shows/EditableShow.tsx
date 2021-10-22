import React, { useState } from "react";

import { EditButtons } from "@/components/lib/EditButtons";
import { ShowWithVenue } from "@/lib/api";

import { ShowPutData } from "../api/shows/queries";
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
  return (
    <EditableShow
      show={newShow}
      startWithEditing
      setAddingShow={setAddingShow}
    />
  );
};

type EditableExistingShowProps = {
  show: ShowWithVenue;
};

export const EditableExistingShow: React.FC<EditableExistingShowProps> = ({
  show,
}) => (
  <EditableShow
    show={show}
    startWithEditing={false}
    setAddingShow={undefined}
  />
);

type EditShowProps = {
  show: ShowWithVenue | ShowPutData;
  startWithEditing: boolean;
  setAddingShow: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

const EditableShow: React.FC<EditShowProps> = ({
  show,
  startWithEditing,
  setAddingShow,
}) => {
  const [editing, setEditing] = useState(startWithEditing);
  const existingShow = "id" in show;

  const handleCancel = () => {
    if (existingShow) {
      setEditing(false);
    } else if (setAddingShow) setAddingShow(false);
  };
  const handleSubmit = () => {
    if (existingShow) {
      // TODO: update show
    } else {
      // TODO: add new show
    }
  };
  const handleDelete = () => {
    if (existingShow) {
      // TODO: send server call to delete show
    } else if (setAddingShow) setAddingShow(false);
  };
  const venue = "venue" in show ? show.venue : undefined;

  return (
    <div>
      <p>
        <EditButtons
          onCancel={handleCancel}
          onSave={handleSubmit}
          onDelete={handleDelete}
        />
        {formattedPerformAt(show.performAt)}
        <Venue venue={venue} editing={editing} />
      </p>
    </div>
  );
};
