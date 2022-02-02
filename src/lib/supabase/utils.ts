import * as Sentry from "@sentry/nextjs";
import React from "react";

import { uniquifyFilename } from "@/lib/api/utils";
import { supabase } from "@/lib/supabase";
import { UPLOADS_BUCKET } from "@/lib/supabase/constants";

export async function uploadPhotoToSupabase({
  event,
  setPhotoFileValue,
  setPhotoPathValue,
  setUploading,
  uploadDirname,
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  setPhotoFileValue: (value: any, shouldValidate?: boolean | undefined) => void;
  setPhotoPathValue: (value: any, shouldValidate?: boolean | undefined) => void;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadDirname: string;
}) {
  setPhotoFileValue(
    event.currentTarget.files ? event.currentTarget.files[0] : undefined,
  );
  // TODO: make separate buckets for dev / production
  // TODO: upload musician images to buckets and remove from app
  if (event.currentTarget.files) {
    const photoFile = event.currentTarget.files[0];
    if (photoFile) {
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
  }
}
