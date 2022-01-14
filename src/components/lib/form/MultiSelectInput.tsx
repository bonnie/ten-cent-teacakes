import { useField } from "formik";
import React from "react";
import { tw } from "twind";

import { FieldContainer } from "@/components/lib/form/FieldContainer";

type MultiSelectProps = {
  name: string;
  options: Array<{ value: string | number; display: string }>;
  label: string;
  required: boolean;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  options,
  label,
  required,
}) => {
  const field = useField({ name });
  return (
    <FieldContainer
      htmlFor={name}
      label={label}
      required={required}
      fieldName={name}
    >
      <select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        className={tw(["px-4", "py-3", "rounded", "w-full"])}
        id={name}
        multiple
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
    </FieldContainer>
  );
};
