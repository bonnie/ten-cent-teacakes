import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

import { useAsync } from "@/lib/hooks/useAsync";

import { supabase } from "..";

const FIVE_MINUTES = 60 * 5;

export const getSignedStorageUrl = async (
  path: string | null,
  bucketPath: string,
): Promise<string | null> => {
  if (!path) return null;

  const { signedURL, error } = await supabase.storage
    .from(bucketPath)
    .createSignedUrl(path, FIVE_MINUTES);

  if (error) {
    Sentry.captureException(error);
    throw error;
  }

  return signedURL;
};

export const useSupabasePhoto = (
  path: string | null,
  bucketPath: string,
): { imgSrc: string | null } => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  useAsync<string | null>(
    () => getSignedStorageUrl(path, bucketPath),
    (signedPath) => setImgSrc(signedPath),
  );
  return { imgSrc };
};
