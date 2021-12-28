// adapted from https://tailwindui.com/components/application-ui/forms/form-layouts

import { useField } from "formik";
import React from "react";

type TextInputProps = {
  name: string;
  label: string;
  placeholderText: string;
  required?: boolean;
  prefix?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholderText,
  prefix = undefined,
  required = true,
}) => {
  const field = useField({ name, type: "text" });
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required ? "*" : null}
          <div className="mt-1 flex rounded-md shadow-sm">
            {prefix ? (
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {prefix}
              </span>
            ) : null}
            <input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...field}
              id={name}
              className="focus:ring-aqua-500 focus:border-aqua-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder={placeholderText}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

TextInput.defaultProps = {
  prefix: undefined,
  required: true,
};
