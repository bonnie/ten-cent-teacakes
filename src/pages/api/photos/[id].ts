import type { NextApiRequest, NextApiResponse } from "next";

import { processApiError } from "@/lib/api/utils";

import { deletePhoto, getPhotoById } from "./queries";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  const { id: idString } = query;
  const id = Number(idString);

  try {
    switch (method) {
      case "GET":
        res.status(200).json(await getPhotoById(id));
        break;
      case "DELETE":
        res.status(204).json(await deletePhoto(id));
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  }
}