import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import apiUtils from "@/lib/api/utils";
import { addShow, getShows } from "@/lib/prisma/queries/shows";

const revalidateRoutes = ["/shows"];

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getShows()),
);

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  apiUtils.checkValidationSecret(req, res);

  const newShow = await addShow(req.body.data);
  Promise.all(revalidateRoutes.map((route) => res.unstable_revalidate(route)));
  return res.status(200).json(newShow);
});

export default handler;
