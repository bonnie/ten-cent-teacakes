import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import React from "react";

export const formattedPerformAt = (performAt: Date): string =>
  dayjs(performAt).format("YYYY MMM D HH:mm");

export const ShowDate: React.FC<{ performAt: Date }> = ({ performAt }) => (
  <span>{formattedPerformAt(performAt)}</span>
);

export const EditableShowDate: React.FC<{
  dateFieldName: string;
  timeFieldName: string;
}> = ({ dateFieldName, timeFieldName }) => (
  <>
    <FormikField fieldName={dateFieldName} fieldType="date" />
    <FormikField fieldName={timeFieldName} fieldType="time" />
  </>
);

const FormikField: React.FC<{ fieldName: string; fieldType: "date" | "time" }> =
  ({ fieldName, fieldType }) => {
    const [field] = useField({ name: fieldName });
    return (
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        name={fieldName}
        type={fieldType}
      />
    );
  };
