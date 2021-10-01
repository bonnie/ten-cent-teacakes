import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

// GET /api/events/upcoming
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const events = await prisma.event.findMany({
    take: 3,
    where: { performAt: { gte: new Date() } },
    orderBy: { performAt: "desc" },
  });
  res.json(events);
}
