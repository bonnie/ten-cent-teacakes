import {
  addStandardDelete,
  createHandler,
} from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";
import type { NextApiRequest, NextApiResponse } from "next";

import { deleteInstrument, patchInstrument } from "./queries";

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deleteInstrument });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
    res
      .status(201)
      .json(await patchInstrument({ data: req.body.body, id: getIdNumFromReq(req) }));
  });

export default handler;
