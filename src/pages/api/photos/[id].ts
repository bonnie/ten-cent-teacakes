import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import apiUtils from "@/lib/api/utils";
import {
  deletePhoto,
  getPhotoById,
  patchPhoto,
} from "@/lib/prisma/queries/photos";

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deletePhoto });

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = apiUtils.getIdNumFromReq(req);
  res.status(200).json(await getPhotoById(id));
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = apiUtils.getIdNumFromReq(req);
  res.status(200).json(await patchPhoto({ data: req.body.data, id }));
});

export default handler;
