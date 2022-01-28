import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { NextApiRequestWithFile } from "@/lib/api/types";
import { processApiError } from "@/lib/api/utils";

// import { createUploadHandler } from "@/lib/api/uploadHandler";
// import { supabase } from "@/lib/supabase";
// import { UPLOADS_BUCKET } from "@/lib/supabase/constants";
import { deleteMusician, getMusicianById, patchMusician } from "./queries";

// const handler = createUploadHandler({
//   // uploadDestinationDir: "musicians",
//   uploadFieldName: "imageFile",
// });

const getIdFromRequest = (req: NextApiRequest) => {
  const { id: idString } = req.query;
  return Number(idString);
};

const handler = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  },
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdFromRequest(req);
  return res.status(200).json(await getMusicianById(id));
});

handler.patch(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  const id = getIdFromRequest(req);
  const imagePath = req.file?.path;
  const { firstName, lastName, bio, instrumentIds } = req.body;
  const data = {
    firstName,
    lastName,
    bio,
    imagePath,
    instrumentIds: JSON.parse(instrumentIds),
  };
  return res.status(201).json(await patchMusician({ data, id }));
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdFromRequest(req);
  await deleteMusician(id);
  return res.status(204).end();
});

// disable default bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSentry(handler);
