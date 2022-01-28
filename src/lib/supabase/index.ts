import * as Sentry from "@sentry/nextjs";
import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL) {
  const error = new Error("Missing process.env.SUPABASE_URL");
  Sentry.captureException(error);
  throw error;
}
if (!process.env.SUPABASE_KEY) {
  const error = new Error("Missing process.env.SUPABASE_KEY");
  Sentry.captureException(error);
  throw error;
}
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
