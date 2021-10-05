import type { NextApiRequest, NextApiResponse } from "next";

import { processApiError } from "../../../lib/api";
import { addEvent, getEvents } from "./queries";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body, method } = req;

  try {
    switch (method) {
      case "GET":
        res.json(await getEvents());
        break;
      case "PUT":
        res.status(201).json(await addEvent(body));
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
