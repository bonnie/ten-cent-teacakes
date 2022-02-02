import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";

import { addInstrument, getInstruments } from "./queries";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getInstruments()),
);

handler.put(async (req: NextApiRequest, res: NextApiResponse) =>
  res.status(201).json(await addInstrument(req.body.body)),
);

export default handler;
