import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";

import { deleteMusician, patchMusician } from "./queries";

const handler = createHandler();

addStandardDelete({ handler, deleteFunc: deleteMusician });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  const { firstName, lastName, bio, instrumentIds, imagePath } = req.body;
  const data = {
    firstName,
    lastName,
    bio,
    imagePath,
    instrumentIds: JSON.parse(instrumentIds),
  };
  return res.status(201).json(await patchMusician({ data, id }));
});

export default withSentry(handler);
