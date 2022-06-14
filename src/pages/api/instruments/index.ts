import type { NextApiRequest, NextApiResponse } from "next";

import { revalidationRoutes } from "@/lib/api/constants";
import { addStandardPut, createHandler } from "@/lib/api/handler";
import {
  addInstrument,
  getInstruments,
} from "@/lib/prisma/queries/instruments";

const handler = createHandler(revalidationRoutes.instruments);
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getInstruments()),
);
addStandardPut({
  handler,
  addFunc: addInstrument,
  revalidationRoutes: revalidationRoutes.instruments,
});

export default handler;
