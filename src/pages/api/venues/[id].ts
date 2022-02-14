import type { NextApiRequest, NextApiResponse } from "next";

import { addStandardDelete, createHandler } from "@/lib/api/handler";
import { getIdNumFromReq } from "@/lib/api/utils";
import {
  deleteVenue,
  getVenueById,
  patchVenue,
} from "@/lib/prisma/queries/venues";

// export async function handle(req: NextApiRequest, res: NextApiResponse) {
//   const { body, method, query } = req;
//   const { id: idString } = query;
//   const id = Number(idString);

//   try {
//     switch (method) {
//       case "PATCH":
//         res.status(201).json(await patchVenue({ data: body.body, id }));
//         break;
//       case "DELETE":
//         await deleteVenue(id);
//         res.status(204).end();
//         break;
//       default:
//         res.setHeader("Allow", ["PATCH", "DELETE"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
//   } catch (error) {
//     const { status, message } = processApiError(error);
//     res.status(status).json({ message });
//   }
// }

const handler = createHandler();
addStandardDelete({ handler, deleteFunc: deleteVenue });

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  res.status(200).json(await getVenueById(id));
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getIdNumFromReq(req);
  res.status(200).json(await patchVenue({ data: req.body.data, id }));
});

export default handler;
