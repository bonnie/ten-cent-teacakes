// upload code adapted from
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";

import { uploadDestination } from "@/lib/api/constants";
import { processApiError, uniquifyFilename } from "@/lib/api/utils";

export const createUploadHandler = ({
  uploadFieldName,
  uploadDestinationDir,
}: {
  uploadFieldName: string;
  uploadDestinationDir: string;
}) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: path.join(uploadDestination, uploadDestinationDir),
      filename: (req, file, cb) =>
        cb(null, uniquifyFilename(file.originalname)),
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
  handler.use(upload.single(uploadFieldName));
  return handler;
};
