import type { NextApiRequest, NextApiResponse } from "next";

import { processApiError } from "@/lib/api/utils";

import { addShow, getShows } from "./queries";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body, method } = req;
  const shows = await getShows();

  try {
    switch (method) {
      case "GET":
        res.json(shows);
        break;
      case "PUT":
        res.status(201).json(await addShow(body));
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  }
}
