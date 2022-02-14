import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import {
  addMusician,
  getMusiciansSortAscending,
} from "@/lib/prisma/queries/musicians";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getMusiciansSortAscending());
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const musician = await addMusician(req.body.data);
  res.status(200).json({ musician });
});

export default withSentry(handler);
