import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";
import { deleteShow, patchShow } from "@/lib/prisma/queries/shows";

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deleteShow });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  res.status(201).json(await patchShow({ data: req.body.data, id }));
});

export default handler;
