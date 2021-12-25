// https://github.com/wojtekmaj/react-datetime-picker/issues/143#issuecomment-853834044
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import React from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

export const formattedPerformAt = (performAt: Date): string =>
  dayjs(performAt).format("YYYY MMM D HH:MM");

export const ShowDate: React.FC<{ performAt: Date }> = ({ performAt }) => (
  <span>{formattedPerformAt(performAt)}</span>
);

// adapted from https://stackoverflow.com/a/58650742
export const EditableShowDate: React.FC<{ performAt: Date }> = ({
  performAt,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField<Date>({ name: "performAt" });
  return (
    <DateTimePicker
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      name="performAt"
      selected={(field.value && performAt) || null}
      onChange={(val: Date) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
