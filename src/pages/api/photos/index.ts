// upload code adapted from
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

import fs from "fs";
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";

import { uploadDestination } from "@/lib/api/constants";
import { processApiError } from "@/lib/api/utils";

// import middleware from "@/middleware";
import { getPhotosSortDescending } from "./queries";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/photos",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const handler = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    console.error(error);
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  },
});
handler.use(upload.single("photoFile"));

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getPhotosSortDescending());
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: create new photo instance in db here
  console.log("handler files", req.files);
  console.log("handler body", req.body);
});

// disable default bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: path.join(uploadDestination, "photos"),
//     filename: (req, file, cb) => cb(null, file.originalname), // TODO: uniquify
//   }),
// });

// const apiRoute = nextConnect({
//   onError(error, req: NextApiRequest, res: NextApiResponse) {
//     const { status, message } = processApiError(error);
//     res.status(status).json({ message });
//   },
//   onNoMatch(req: NextApiRequest, res: NextApiResponse) {
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   },
// });

// apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
//   res.json(await getPhotosSortDescending());
// });

// const uploadMiddleware = upload.single("photoFile");
// apiRoute.use(uploadMiddleware);
// apiRoute.put(async (req: NextApiRequest, res: NextApiResponse) => {
//   // TODO: create new photo instance in db here
//   console.log(req.files);
//   console.log(req.body);
// });

// export default apiRoute;

// // disable default bodyParser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // export default async function handle(
// //   req: NextApiRequest,
// //   res: NextApiResponse,
// // ) {
// //   try {
// //     if (req.method === "GET") {
// //       res.json(await getPhotosSortDescending());
// //     } else if (req.method === "PUT") {
// //       const form = new formidable.IncomingForm({
// //         uploadDir: path.join(uploadDestination, "photos"),
// //         keepExtensions: true,
// //       });
// //       form.parse(req, (err, fields, files) => {
// //         console.log(err, fields, files);
// //       });
// //     } else {
// //       res.setHeader("Allow", ["GET, PUT"]);
// //       res.status(405).end(`Method ${req.method} Not Allowed`);
// //     }
// //   } catch (error) {
// //     const { status, message } = processApiError(error);
// //     res.status(status).json({ message });
// //   }
// // }
