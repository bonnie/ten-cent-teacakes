import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import {
  addInstrument,
  getInstruments,
} from "@/lib/prisma/queries/instruments";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getInstruments()),
);

handler.put(async (req: NextApiRequest, res: NextApiResponse) =>
  res.status(200).json(await addInstrument(req.body.data)),
);

export default handler;
