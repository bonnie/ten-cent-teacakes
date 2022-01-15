import type { NextApiRequest, NextApiResponse } from "next";

import { NextApiRequestWithFile } from "@/lib/api/types";
import { createUploadHandler } from "@/lib/api/uploadHandler";

import { addPhoto, getPhotos } from "./queries";

const handler = createUploadHandler({
  uploadDestinationDir: "photos",
  uploadFieldName: "photoFile",
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getPhotos());
});

handler.put(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  const photoPath = req.file?.path;
  if (photoPath) {
    const photo = await addPhoto({
      imagePath: photoPath,
      showId: req.body.showId,
      photographer: req.body.photographer,
    });
    res.status(200).json({ photo });
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

export default handler;
