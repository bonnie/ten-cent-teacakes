import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import apiUtils from "@/lib/api/utils";
import { deleteShow, patchShow } from "@/lib/prisma/queries/shows";

const { checkValidationSecret, getIdNumFromReq } = apiUtils;
const revalidateRoutes = ["/shows"];

const handler = createHandler();
addStandardDelete({
  handler,
  deleteFunc: deleteShow,
  revalidateRoutes: ["/shows"],
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  checkValidationSecret(req, res);
  const id = getIdNumFromReq(req);
  const patchedShow = await patchShow({ data: req.body.data, id });
  Promise.all(revalidateRoutes.map((route) => res.unstable_revalidate(route)));
  return res.status(200).json(patchedShow);
});

export default handler;
