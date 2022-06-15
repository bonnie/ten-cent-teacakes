import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { revalidationRoutes } from "@/lib/api/constants";
import { addStandardPut, createHandler } from "@/lib/api/handler";
import { addPhoto, getPhotos } from "@/lib/prisma/queries/photos";

const handler = createHandler(revalidationRoutes.photos);
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getPhotos()),
);
addStandardPut({
  handler,
  addFunc: addPhoto,
  revalidationRoutes: revalidationRoutes.photos,
});

export default withSentry(handler);
