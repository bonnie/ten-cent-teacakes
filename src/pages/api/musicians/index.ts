import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { handler } from "@/lib/api/handler";

import { addMusician, getMusiciansSortAscending } from "./queries";

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getMusiciansSortAscending());
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, bio, instrumentIds, imagePath } = req.body;
  if (imagePath) {
    const musician = await addMusician({
      imagePath,
      firstName,
      lastName,
      bio,
      instrumentIds: JSON.parse(instrumentIds),
    });
    res.status(200).json({ musician });
  } else {
    res.status(400).json({ message: "no file received" });
  }
});

export default withSentry(handler);
