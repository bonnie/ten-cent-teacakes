import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

// import { NextApiRequestWithFile } from "@/lib/api/types";
// import { createUploadHandler } from "@/lib/api/handler";
import { handler } from "@/lib/api/handler";
import { uniquifyFilename } from "@/lib/api/utils";

// import { supabase } from "@/lib/supabase";
// import { UPLOADS_BUCKET } from "@/lib/supabase/constants";
import { addPhoto, getPhotos } from "./queries";

// const handler = createUploadHandler({
//   uploadDestinationDir: "photos",
//   uploadFieldName: "photoFile",
// });

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getPhotos());
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { photoFile } = req.body;
  const photoFilename = uniquifyFilename(photoFile.name);
  const photoPath = path.join(photoFile.path, photoFilename);

  if (photoPath) {
    const photo = await addPhoto({
      imagePath: req.body.imagePath,
      showId: req.body.showId,
      photographer: req.body.photographer,
    });
    res.status(200).json({ photo });
  } else {
    res.status(400).json({ message: "no file received" });
  }
});

// disable default bodyParser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default withSentry(handler);
