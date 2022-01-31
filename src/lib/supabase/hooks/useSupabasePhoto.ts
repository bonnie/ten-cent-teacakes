import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

import { supabase } from "..";
import { UPLOADS_BUCKET } from "../constants";

const FIVE_MINUTES = 60 * 5;

export const getSignedStorageUrl = async (
  path: string | null,
): Promise<string | null> => {
  if (!path) return null;

  const { signedURL, error } = await supabase.storage
    .from(UPLOADS_BUCKET)
    .createSignedUrl(path, FIVE_MINUTES);

  if (error) {
    Sentry.captureException(error);
    throw error;
  }

  return signedURL;
};

export const useSupabasePhoto = (
  path: string | null,
): { imgSrc: string | null } => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  getSignedStorageUrl(path).then((signedPath) => setImgSrc(signedPath));
  return { imgSrc };
};
