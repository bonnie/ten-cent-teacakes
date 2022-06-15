import type { NextApiRequest, NextApiResponse } from "next";

import { revalidationRoutes } from "@/lib/api/constants";
import { addStandardPut, createHandler } from "@/lib/api/handler";
import { addVenue, getVenues } from "@/lib/prisma/queries/venues";

const handler = createHandler(revalidationRoutes.venues);
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getVenues()),
);

addStandardPut({
  handler,
  addFunc: addVenue,
  revalidationRoutes: revalidationRoutes.venues,
});

export default handler;
