import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";
import {
  deleteInstrument,
  patchInstrument,
} from "@/lib/prisma/queries/instruments";

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deleteInstrument });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(201)
    .json(
      await patchInstrument({ data: req.body.data, id: getIdNumFromReq(req) }),
    );
});

export default handler;
