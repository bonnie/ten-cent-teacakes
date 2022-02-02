import { useField } from "formik";
import React, { useRef, useState } from "react";
import { tw } from "twind";

import { FieldContainer } from "@/components/lib/form/FieldContainer";
import { uploadPhotoToSupabase } from "@/lib/supabase/utils";

export const PhotoUpload: React.FC<{
  name: string;
  label?: string;
  required: boolean;
  uploadDirname: string;
}> = ({ name, required, label = "Choose a file to upload", uploadDirname }) => {
  const [uploading, setUploading] = useState(false);
  const [photoFile, , photoFileHelpers] = useField({
    name,
    type: "file",
  });
  const { setValue: setPhotoFileValue } = photoFileHelpers;
  const photoRef = useRef<HTMLInputElement | null>(null);

  const [, , photoPathHelpers] = useField("photoPath");
  const { setValue: setPhotoPathValue } = photoPathHelpers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (photoRef.current) {
      // TODO: confirm musician photo is (roughly) square
      // const imgWidth = photoRef.current.clientWidth;
      // const imgHeight = photoRef.current.clientHeight;

      uploadPhotoToSupabase({
        event,
        setPhotoFileValue,
        setPhotoPathValue,
        setUploading,
        uploadDirname,
      });
    }
  };

  return (
    <FieldContainer
      htmlFor={name}
      label={label}
      required={required}
      fieldName={name}
    >
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...photoFile}
        ref={photoRef}
        onChange={handleChange}
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
          "bg-white",
          "bg-clip-padding",
          "border",
          "border-solid border-gray-300",
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
      {uploading ? <p>Uploading...</p> : null}
    </FieldContainer>
  );
};

PhotoUpload.defaultProps = {
  label: "Choose a file to upload",
};
