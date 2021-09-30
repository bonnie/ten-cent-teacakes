import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const musicians = await prisma.musician.findMany({
    orderBy: [{ lastName: "asc" }],
  });
  res.json(musicians);
}
