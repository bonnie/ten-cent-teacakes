import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { revalidationRoutes } from "@/lib/api/constants";
import { addStandardPut, createHandler } from "@/lib/api/handler";
import {
  addMusician,
  getMusiciansSortAscending,
} from "@/lib/prisma/queries/musicians";

const handler = createHandler(revalidationRoutes.musicians);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getMusiciansSortAscending());
});

addStandardPut({
  handler,
  addFunc: addMusician,
  revalidationRoutes: revalidationRoutes.musicians,
});

export default withSentry(handler);
