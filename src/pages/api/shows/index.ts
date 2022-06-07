import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { addShow, getShows } from "@/lib/prisma/queries/shows";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json(await getShows()),
);

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const newShow = await addShow(req.body.data);
  res.unstable_revalidate("/shows");
  // res.unstable_revalidate("/");
  return res.status(200).json(newShow);
});

export default handler;
