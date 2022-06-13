import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import apiUtils from "@/lib/api/utils";
import {
  deleteVenue,
  getVenueById,
  patchVenue,
} from "@/lib/prisma/queries/venues";

const revalidateRoutes = ["/shows"];

const handler = createHandler();
addStandardDelete({
  handler,
  deleteFunc: deleteVenue,
  revalidateRoutes,
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = apiUtils.getIdNumFromReq(req);
  res.status(200).json(await getVenueById(id));
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  apiUtils.checkValidationSecret(req, res);

  const id = apiUtils.getIdNumFromReq(req);
  const patchedVenue = await patchVenue({ data: req.body.data, id });

  Promise.all(revalidateRoutes.map((route) => res.unstable_revalidate(route)));

  res.status(200).json(patchedVenue);
});

export default handler;
