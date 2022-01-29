import * as Sentry from "@sentry/nextjs";

export const getSupabaseStorageLink = (path: string): string => {
  if (!process.env.SUPABASE_STORAGE_URL) {
    const error = new Error("Missing process.env.SUPABASE_STORAGE_URL");
    Sentry.captureException(error);
    throw error;
  }

  if (!process.env.SUPABASE_STORAGE_KEY) {
    const error = new Error("Missing process.env.SUPABASE_STORAGE_KEY");
    Sentry.captureException(error);
    throw error;
  }

  return `${process.env.SUPABASE_STORAGE_URL}/${path}?token=${process.env.SUPABASE_STORAGE_KEY}`;
};
