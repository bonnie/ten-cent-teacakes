import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import apiUtils from "@/lib/api/utils";
import {
  deleteInstrument,
  patchInstrument,
} from "@/lib/prisma/queries/instruments";

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deleteInstrument });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(
    await patchInstrument({
      data: req.body.data,
      id: apiUtils.getIdNumFromReq(req),
    }),
  );
});

export default handler;
