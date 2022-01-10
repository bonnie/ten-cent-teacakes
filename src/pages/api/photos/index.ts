// upload code adapted from
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";

import { uploadDestination } from "@/lib/api/constants";
import { processApiError, uniquifyFilename } from "@/lib/api/utils";

// import middleware from "@/middleware";
import { addPhoto, getPhotos } from "./queries";

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(uploadDestination, "photos"),
    filename: (req, file, cb) => cb(null, uniquifyFilename(file.originalname)),
  }),
});

const handler = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  },
});
handler.use(upload.single("photoFile"));

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getPhotos());
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
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
