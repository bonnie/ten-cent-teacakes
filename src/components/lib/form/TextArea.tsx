// adapted from https://tailwindui.com/components/application-ui/forms/form-layouts

import { useField } from "formik";
import React from "react";

import { FieldContainer } from "./FieldContainer";

type TextAreaProps = {
  name: string;
  label: string;
  placeholderText?: string;
  required: boolean;
};

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholderText = undefined,
  required,
}) => {
  const [field] = useField({ name });
  return (
    <FieldContainer htmlFor={name} required={required} label={label}>
      <div className="mt-1 flex rounded-md shadow-sm">
        <textarea
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          id={name}
          className="focus:ring-aqua-500 focus:border-aqua-500 flex-1 block w-full rounded-none rounded-r-md border-gray-300"
          placeholder={placeholderText}
        />
      </div>
    </FieldContainer>
  );
};

TextArea.defaultProps = {
  placeholderText: undefined,
};
