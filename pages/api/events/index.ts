import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const events = await prisma.event.findMany({
    orderBy: { performAt: "desc" },
  });
  res.json(events);
}
