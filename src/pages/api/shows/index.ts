import type { NextApiRequest, NextApiResponse } from "next";

import { revalidationRoutes } from "@/lib/api/constants";
import { addStandardPut, createHandler } from "@/lib/api/handler";
import { addShow, getShows } from "@/lib/prisma/queries/shows";

const handler = createHandler(revalidationRoutes.shows);
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getShows()),
);

addStandardPut({
  handler,
  addFunc: addShow,
  revalidationRoutes: revalidationRoutes.shows,
});

export default handler;
