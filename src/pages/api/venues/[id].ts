import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";
import {
  deleteVenue,
  getVenueById,
  patchVenue,
} from "@/lib/prisma/queries/venues";

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deleteVenue });

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  res.status(200).json(await getVenueById(id));
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  res.status(200).json(await patchVenue({ data: req.body.data, id }));
});

export default handler;
