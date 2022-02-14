import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq, processApiError } from "@/lib/api/utils";
import { deleteShow, patchShow } from "@/lib/prisma/queries/shows";

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deleteShow });

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  res.status(201).json(await patchShow({ data: req.body.data, id }));
});

export async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { body, method, query } = req;
  const { id: idString } = query;
  const id = Number(idString);

  try {
    switch (method) {
      case "PATCH":
        res.status(201).json(await patchShow({ data: body.body, id }));
        break;
      case "DELETE":
        await deleteShow(id);
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

export default handler;
