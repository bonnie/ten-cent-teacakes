// https://github.com/wojtekmaj/react-datetime-picker/issues/143#issuecomment-853834044
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

import dayjs from "dayjs";
import React from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { Control, Controller } from "react-hook-form";

export const formattedPerformAt = (performAt: Date): string =>
  dayjs(performAt).format("YYYY MMM D HH:MM");

export const ShowDate: React.FC<{ performAt: Date }> = ({ performAt }) => (
  <span>{formattedPerformAt(performAt)}</span>
);

export const EditableShowDate: React.FC<{ performAt: Date; control: Control }> =
  ({ performAt, control }) => (
    <Controller
      control={control}
      name="performAt"
      defaultValue={performAt}
      render={({ field }) => (
        <DateTimePicker
          onChange={(date: Date) => field.onChange(date)}
          value={field.value}
        />
      )}
    />
  );
