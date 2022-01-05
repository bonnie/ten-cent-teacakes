// upload code adapted from
// https://gist.github.com/agmm/da47a027f3d73870020a5102388dd820
import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

import { uploadDestination } from "@/lib/api/constants";
import { processApiError } from "@/lib/api/utils";

import { getPhotosSortDescending } from "./queries";

// disable default bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      res.json(await getPhotosSortDescending());
    } else if (req.method === "PUT") {
      const form = new formidable.IncomingForm({
        uploadDir: path.join(uploadDestination, "photos"),
        keepExtensions: true,
      });
      form.parse(req, (err, fields, files) => {
        console.log(err, fields, files);
      });
    } else {
      res.setHeader("Allow", ["GET, PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  }
}
