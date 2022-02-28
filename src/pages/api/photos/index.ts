import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { addPhoto, getPhotos } from "@/lib/prisma/queries/photos";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getPhotos());
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = req.body;
  if (data.imagePath) {
    const photo = await addPhoto(data);
    res.status(200).json({ photo });
  } else {
    res.status(400).json({ message: "no file received" });
  }
});

export default withSentry(handler);
