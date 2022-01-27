import { ErrorMessage } from "formik";
import React from "react";
import { tw } from "twind";

export const FieldContainer: React.FC<{
  htmlFor: string;
  label: string;
  required: boolean;
  fieldName: string;
}> = ({ htmlFor, label, required, children, fieldName }) => (
  <div className={tw(["px-4", "py-5", "bg-white", "space-y-6", "sm:p-6"])}>
    <div className={tw(["grid", "grid-cols-3", "gap-6"])}>
      <div className={tw(["col-span-3", "sm:col-span-2"])}>
        <label
          htmlFor={htmlFor}
          className={tw(["block", "font-medium", "text-gray-700", "text-left"])}
        >
          {label}{" "}
          {required ? <span className={tw(["text-red-600"])}>*</span> : null}
        </label>
        {children}
        <span className={tw(["text-red-600", "font-bold"])}>
          <ErrorMessage name={fieldName} />
        </span>
      </div>
    </div>
  </div>
);
