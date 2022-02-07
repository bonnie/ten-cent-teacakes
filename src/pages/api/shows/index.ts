import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { addShow, getShows } from "@/lib/prisma/queries/shows";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getShows()),
);

handler.put(async (req: NextApiRequest, res: NextApiResponse) =>
  res.status(201).json(await addShow(req.body.body)),
);

export default handler;
