import type { NextApiRequest, NextApiResponse } from "next";

import { deleteEvent, patchEvent } from "./queries";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body, method, query } = req;
  const { id: idString } = query;
  const id = Number(idString);

  switch (method) {
    case "PATCH":
      res.status(201).json(await patchEvent({ body, id }));
      break;
    case "DELETE":
      res.status(204).json(await deleteEvent(id));
      break;
    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
