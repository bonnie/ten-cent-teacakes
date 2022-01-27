// adapted from https://tailwindui.com/components/application-ui/forms/form-layouts

import { useField } from "formik";
import React from "react";
import { tw } from "twind";

import { FieldContainer } from "./FieldContainer";

type TextInputProps = {
  name: string;
  label: string;
  placeholderText?: string;
  required?: boolean;
  prefix?: string;
  type?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholderText = undefined,
  prefix = undefined,
  required = true,
  type = "text",
}) => {
  const [field] = useField({ name });
  return (
    <FieldContainer
      htmlFor={name}
      required={required}
      label={label}
      fieldName={name}
    >
      <div className={tw(["mt-1", "flex", "rounded-md", "shadow-sm"])}>
        {prefix ? (
          <span
            className={tw([
              "inline-flex",
              "items-center",
              "px-3",
              "rounded-l-md",
              "border",
              "border-r-0",
              "border-gray-300",
              "bg-gray-50 text-gray-500",
            ])}
          >
            {prefix}
          </span>
        ) : null}
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          type={type}
          id={name}
          className={tw([
            "focus:ring-aqua-500",
            "focus:border-aqua-500",
            "flex-1",
            "block",
            "w-full",
            "rounded-none",
            "rounded-r-md",
            "border-gray-300",
          ])}
          placeholder={placeholderText}
        />
      </div>
    </FieldContainer>
  );
};

TextInput.defaultProps = {
  prefix: undefined,
  required: true,
  type: "text",
  placeholderText: undefined,
};
