import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";
import { deleteMusician, patchMusician } from "@/lib/prisma/queries/musicians";

const handler = createHandler();

addStandardDelete({ handler, deleteFunc: deleteMusician });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  const { data } = req.body;
  const musician = await patchMusician({ data, id });
  return res.status(200).json(musician);
});

export default withSentry(handler);
