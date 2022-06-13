import * as Sentry from "@sentry/nextjs";
import imageCompression from "browser-image-compression";
import React from "react";

import apiUtils from "@/lib/api/utils";
import { supabase } from "@/lib/supabase";
import { UPLOADS_BUCKET } from "@/lib/supabase/constants";

const uploadPhotoToSupabase = async ({
  imagePath,
  photoFile,
  setimagePathValue,
}: {
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  imagePath: string;
  photoFile: File;
  setimagePathValue: (value: any, shouldValidate?: boolean | undefined) => void;
}) => {
  const { data, error } = await supabase.storage
    .from(UPLOADS_BUCKET)
    .upload(imagePath, photoFile);

  if (error) {
    setimagePathValue(undefined);
    Sentry.captureException(error);
    throw error;
  }

  return data;
};

export async function uploadPhotoAndThumbnailToSupabase({
  event,
  setPhotoFileValue, // for form
  setimagePathValue, // for form
  setUploading, // for spinner
  uploadDirname, // directory in bucket
  maxThumbnailDimension,
  maxDimension, // for "full size" photo
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  setPhotoFileValue: (value: any, shouldValidate?: boolean | undefined) => void;
  setimagePathValue: (value: any, shouldValidate?: boolean | undefined) => void;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadDirname: string;
  maxThumbnailDimension?: number;
  maxDimension?: number;
}) {
  setPhotoFileValue(
    event.currentTarget.files ? event.currentTarget.files[0] : undefined,
  );
  if (event.currentTarget.files) {
    const photoFile = event.currentTarget.files[0];
    if (photoFile) {
      setUploading(true);
      const { uniqueFileName, uniqueThumbnailFileName } =
        apiUtils.uniquifyFilename(photoFile.name);

      // thumbnail
      if (maxThumbnailDimension) {
        const thumbnailPath = `${uploadDirname}/${uniqueThumbnailFileName}`;
        const thumbPhotoFile = await imageCompression(photoFile, {
          maxWidthOrHeight: maxThumbnailDimension,
        });
        await uploadPhotoToSupabase({
          imagePath: thumbnailPath,
          photoFile: thumbPhotoFile,
          setUploading,
          setimagePathValue,
        });
      }

      // large file
      const imagePath = `${uploadDirname}/${uniqueFileName}`;
      const largePhotoFile = await imageCompression(photoFile, {
        maxWidthOrHeight: maxDimension,
      });
      const data = await uploadPhotoToSupabase({
        imagePath,
        photoFile: largePhotoFile,
        setUploading,
        setimagePathValue,
      });
      if (data) {
        setimagePathValue(imagePath);
      } else {
        throw new Error("did not receive key from Supabase upload");
      }

      setUploading(false);
    }
  }
}
