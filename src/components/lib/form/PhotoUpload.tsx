import * as Sentry from "@sentry/nextjs";
import { useField } from "formik";
import React, { useState } from "react";
import { tw } from "twind";

import { FieldContainer } from "@/components/lib/form/FieldContainer";
import { uniquifyFilename } from "@/lib/api/utils";
import { supabase } from "@/lib/supabase";
import { UPLOADS_BUCKET } from "@/lib/supabase/constants";

export const PhotoUpload: React.FC<{
  name: string;
  label?: string;
  required: boolean;
  uploadDirname: string;
}> = ({ name, required, label = "Choose a file to upload", uploadDirname }) => {
  const [uploading, setUploading] = useState(false);

  const [photoFile, , photoFileHelpers] = useField({ name, type: "file" });
  const { setValue: setPhotoFileValue } = photoFileHelpers;

  const [, , photoPathHelpers] = useField("photoPath");
  const { setValue: setPhotoPathValue } = photoPathHelpers;

  return (
    <FieldContainer
      htmlFor={name}
      label={`${label} Max size: 1 MB`}
      required={required}
      fieldName={name}
    >
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...photoFile}
        onChange={async (event) => {
          setPhotoFileValue(
            event.currentTarget.files
              ? event.currentTarget.files[0]
              : undefined,
          );
          // TODO: separate into folders for uploads / musicians
          // TODO: make separate buckets for dev / production
          // TODO: upload musician images to buckets and remove from app
          // TODO: uninstall multer etc. (express types?)
          if (event.currentTarget.files) {
            const photoFile = event.currentTarget.files[0];
            const uniqueName = uniquifyFilename(photoFile.name);
            const photoPath = `${uploadDirname}/${uniqueName}`;

            setUploading(true);
            const { data, error } = await supabase.storage
              .from(UPLOADS_BUCKET)
              .upload(photoPath, photoFile);
            setUploading(false);

            if (error) {
              setPhotoPathValue(undefined);
              Sentry.captureException(error);
              throw error;
            }

            if (data) {
              setPhotoPathValue(photoPath);
            } else {
              throw new Error("did not receive key from Supabase upload");
            }
          }
        }}
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
