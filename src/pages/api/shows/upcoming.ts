import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

// GET /api/shows/upcoming
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const shows = await prisma.show.findMany({
    take: 3,
    where: { performAt: { gte: new Date() } },
    orderBy: { performAt: "desc" },
  });
  res.json(shows);
}
