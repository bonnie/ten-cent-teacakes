// upload code adapted from
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";

import { uploadDestination } from "@/lib/api/constants";
import { processApiError, uniquifyFilename } from "@/lib/api/utils";

// import middleware from "@/middleware";
import { addPhoto, getPhotosSortDescending } from "./queries";

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
  res.json(await getPhotosSortDescending());
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
/// ///////////////

// import formidable from "formidable-serverless";
// import fs from "fs";
// import multer from "multer";
// import type { NextApiRequest, NextApiResponse } from "next";
// import nextConnect from "next-connect";
// import path from "path";

// import { uploadDestination } from "@/lib/api/constants";
// import { processApiError } from "@/lib/api/utils";

// import { addPhoto, getPhotosSortDescending } from "./queries";

// // disable default bodyParser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   try {
//     if (req.method === "GET") {
//       res.json(await getPhotosSortDescending());
//     } else if (req.method === "PUT") {
//       console.log("STARTING!!");
//       const formData = await new Promise((resolve, reject) => {
//         const form = new formidable.IncomingForm({
//           uploadDir: path.join(uploadDestination, "photos"),
//           keepExtensions: true,
//         });

//         form.parse(req, (err, fields, files) => {
//           if (err) return reject(err);
//           resolve({ fields, files });
//         });
//       });

//       console.log("formData", formData);
//       const photo = await addPhoto({
//         imagePath: formData.files.photoFile.path,
//         showId: formData.fields.showId,
//         photographer: formData.fields.photographer,
//       });
//       console.log("PHOTO", photo);
//       res.status(200).json({ photo });
//     } else {
//       res.setHeader("Allow", ["GET, PUT"]);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   } catch (error) {
//     const { status, message } = processApiError(error);
//     res.status(status).json({ message });
//   }
// }

// export default async (req, res) => {
//   // parse form with a Promise wrapper
//   const data = await new Promise((resolve, reject) => {
//     const form = new IncomingForm();

//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });

//   // read file from the temporary path
//   const contents = await fs.readFile(data?.files?.nameOfTheInput.path, {
//     encoding: "utf8",
//   });

//   // contents is a string with the content of uploaded file, so you can read it or store
// };

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
