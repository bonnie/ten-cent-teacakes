import type { NextApiRequest, NextApiResponse } from "next";

import { addEvent, getEvents } from "./queries";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body, method } = req;

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
}