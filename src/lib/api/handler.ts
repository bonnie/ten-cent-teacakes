//
import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { processApiError } from "@/lib/api/utils";

// TODO: use this for all handlers
export const handler = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    Sentry.captureException(error);
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  },
});
