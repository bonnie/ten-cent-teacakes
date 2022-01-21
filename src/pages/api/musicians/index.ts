import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { NextApiRequestWithFile } from "@/lib/api/types";
import { createUploadHandler } from "@/lib/api/uploadHandler";

import { addMusician, getMusiciansSortAscending } from "./queries";

const handler = createUploadHandler({
  uploadDestinationDir: "musicians",
  uploadFieldName: "imageFile",
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getMusiciansSortAscending());
});

handler.put(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  const imagePath = req.file?.path;
  const { firstName, lastName, bio, instrumentIds } = req.body;
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

// disable default bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSentry(handler);
