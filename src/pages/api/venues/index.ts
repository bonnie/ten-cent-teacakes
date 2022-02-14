import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { addVenue, getVenues } from "@/lib/prisma/queries/venues";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getVenues()),
);

handler.put(async (req: NextApiRequest, res: NextApiResponse) =>
  res.status(200).json(await addVenue(req.body.data)),
);

export default handler;
