import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";
import { deleteShow, patchShow } from "@/lib/prisma/queries/shows";

const handler = createHandler();
// TODO: update standard delete
addStandardDelete({ handler, deleteFunc: deleteShow });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const id = getIdNumFromReq(req);
  res.unstable_revalidate("/shows");

  return res.status(200).json(await patchShow({ data: req.body.data, id }));
});

export default handler;
