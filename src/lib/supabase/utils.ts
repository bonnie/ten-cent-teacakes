import * as Sentry from "@sentry/nextjs";
import imageCompression from "browser-image-compression";
import React from "react";

import { uniquifyFilename } from "@/lib/api/utils";
import { supabase } from "@/lib/supabase";
import { UPLOADS_BUCKET } from "@/lib/supabase/constants";

const uploadPhotoToSupabase = async ({
  photoPath,
  photoFile,
  setPhotoPathValue,
}: {
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  photoPath: string;
  photoFile: File;
  setPhotoPathValue: (value: any, shouldValidate?: boolean | undefined) => void;
}) => {
  const { data, error } = await supabase.storage
    .from(UPLOADS_BUCKET)
    .upload(photoPath, photoFile);

  if (error) {
    setPhotoPathValue(undefined);
    Sentry.captureException(error);
    throw error;
  }

  return data;
};

export async function uploadPhotoAndThumbnailToSupabase({
  event,
  setPhotoFileValue, // for form
  setPhotoPathValue, // for form
  setUploading, // for spinner
  uploadDirname, // directory in bucket
  maxThumbnailDimension,
  maxSizeMB, // for "full size" photo
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  setPhotoFileValue: (value: any, shouldValidate?: boolean | undefined) => void;
  setPhotoPathValue: (value: any, shouldValidate?: boolean | undefined) => void;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadDirname: string;
  maxThumbnailDimension?: number;
  maxSizeMB?: number;
}) {
  setPhotoFileValue(
    event.currentTarget.files ? event.currentTarget.files[0] : undefined,
  );
  if (event.currentTarget.files) {
    const photoFile = event.currentTarget.files[0];
    if (photoFile) {
      setUploading(true);
      const { uniqueFileName, uniqueThumbnailFileName } = uniquifyFilename(
        photoFile.name,
      );

      // thumbnail
      if (maxThumbnailDimension) {
        const thumbnailPath = `${uploadDirname}/${uniqueThumbnailFileName}`;
        const thumbPhotoFile = await imageCompression(photoFile, {
          maxWidthOrHeight: maxThumbnailDimension,
        });
        await uploadPhotoToSupabase({
          photoPath: thumbnailPath,
          photoFile: thumbPhotoFile,
          setUploading,
          setPhotoPathValue,
        });
      }

      // large file
      const photoPath = `${uploadDirname}/${uniqueFileName}`;
      const largePhotoFile = await imageCompression(photoFile, { maxSizeMB });
      const data = await uploadPhotoToSupabase({
        photoPath,
        photoFile: largePhotoFile,
        setUploading,
        setPhotoPathValue,
      });
      if (data) {
        setPhotoPathValue(photoPath);
      } else {
        throw new Error("did not receive key from Supabase upload");
      }

      setUploading(false);
    }
  }
}
