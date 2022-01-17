import { useField } from "formik";
import React from "react";
import { tw } from "twind";

import { FieldContainer } from "@/components/lib/form/FieldContainer";

export const PhotoUpload: React.FC<{
  name: string;
  label?: string;
  required: boolean;
}> = ({ name, required, label = "Choose a file to upload" }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, _, helpers] = useField({ name, type: "file" });
  const { setValue } = helpers;

  return (
    <FieldContainer
      htmlFor={name}
      label={label}
      required={required}
      fieldName={name}
    >
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        onChange={(event) =>
          setValue(
            event.currentTarget.files
              ? event.currentTarget.files[0]
              : undefined,
          )
        }
        value={undefined}
        className={tw([
          "form-control",
          "block",
          "w-full",
          "px-3",
          "py-1.5",
          "text-base",
          "font-normal",
          "text-gray-700",
          "bg-white bg-clip-padding",
          "border border-solid border-gray-300",
          "rounded",
          "transition",
          "ease-in-out",
          "m-0",
          "focus:text-gray-700",
          "focus:bg-white",
          "focus:border-aqua-500",
          "focus:outline-none",
        ])}
        type="file"
        id={name}
        name={name}
      />
    </FieldContainer>
  );
};

PhotoUpload.defaultProps = {
  label: "Choose a file to upload",
};
