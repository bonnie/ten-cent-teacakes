import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { handler } from "@/lib/api/handler";

import { addPhoto, getPhotos } from "./queries";

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getPhotos());
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.photoPath) {
    const photo = await addPhoto({
      imagePath: req.body.photoPath,
      showId: req.body.showId,
      photographer: req.body.photographer,
      photoWidth: req.body.photoWidth,
      photoHeight: req.body.photoHeight,
    });
    res.status(200).json({ photo });
  } else {
    res.status(400).json({ message: "no file received" });
  }
});

export default withSentry(handler);
