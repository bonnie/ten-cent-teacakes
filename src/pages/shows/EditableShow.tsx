/* eslint-disable react/jsx-props-no-spreading */
// https://github.com/wojtekmaj/react-datetime-picker/issues/143#issuecomment-853834044
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Show } from ".prisma/client";

import dayjs from "dayjs";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { Controller, useForm } from "react-hook-form";

import { EditButtons } from "@/components/lib/EditButtons";
import { ShowWithVenue } from "@/lib/api";
import { ShowPatchData, ShowPutData } from "@/pages/api/shows/queries";

import { formattedPerformAt } from "./utils";
import { DisplayShowVenue, EditableShowVenue } from "./Venue";

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

const venueDisplay = (
  show: ShowWithVenue | ShowPutData,
  editing: boolean,
): React.ReactElement => {
  const venue = "venue" in show ? show.venue : undefined;

  if (editing) return <EditableShowVenue venue={venue} />;
  if (venue) return <DisplayShowVenue venue={venue} />;
  return <span>TBD</span>;
};

const EditableShow: React.FC<EditShowProps> = ({
  show,
  startWithEditing,
  handleCancel,
  handleSave,
  handleDelete,
}) => {
  const [editing, setEditing] = useState(startWithEditing);

  const dateString = dayjs(show.performAt).format("YYYY-MM-DDTHH:MM");
  const [performAt, setPerformAt] = useState(dateString);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <p>
        <form onSubmit={handleSubmit(handleSave)}>
          <EditButtons
            editing={editing}
            setEditing={setEditing}
            handleSave={() => handleSubmit(handleSave)}
            handleDelete={handleDelete}
          />
          {editing ? (
            <Controller
              control={control}
              name="performAt"
              defaultValue={show.performAt}
              render={({ field }) => (
                <DateTimePicker
                  onChange={(date: Date) => field.onChange(date)}
                  value={field.value}
                />
              )}
            />
          ) : (
            formattedPerformAt(show.performAt)
          )}
          {venueDisplay(show, editing)}
        </form>
      </p>
    </div>
  );
};
