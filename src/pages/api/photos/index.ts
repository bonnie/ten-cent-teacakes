import type { NextApiRequest, NextApiResponse } from "next";

import { processApiError } from "@/lib/axios/utils";

import { getPhotosSortDescending } from "./queries";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      res.json(await getPhotosSortDescending());
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  }
}
