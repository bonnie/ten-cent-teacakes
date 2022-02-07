import type { NextApiRequest, NextApiResponse } from "next";

import { processApiError } from "@/lib/api/utils";
import { deleteVenue, patchVenue } from "@/lib/prisma/queries/venues";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body, method, query } = req;
  const { id: idString } = query;
  const id = Number(idString);

  try {
    switch (method) {
      case "PATCH":
        res.status(201).json(await patchVenue({ data: body.body, id }));
        break;
      case "DELETE":
        await deleteVenue(id);
        res.status(204).end();
        break;
      default:
        res.setHeader("Allow", ["PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  }
}
