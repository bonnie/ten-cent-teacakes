import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import apiUtils from "@/lib/api/utils";
import { addVenue, getVenues } from "@/lib/prisma/queries/venues";

const revalidateRoutes = ["/shows"];

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getVenues()),
);

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  apiUtils.checkValidationSecret(req, res);

  const newVenue = await addVenue(req.body.data);
  Promise.all(revalidateRoutes.map((route) => res.unstable_revalidate(route)));
  res.status(200).json(newVenue);
});

export default handler;
