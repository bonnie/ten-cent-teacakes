import type { NextApiRequest, NextApiResponse } from "next";

import { processApiError } from "@/lib/api/utils";
import { WhitelistResponse } from "@/lib/auth/types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    const whitelistString = process.env.AUTH0_WHITELIST;
    const whitelist = whitelistString ? whitelistString.split("|") : [];
    const response: WhitelistResponse = { whitelist };
    switch (method) {
      case "GET":
        res.json(response);
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    const { status, message } = processApiError(error);
    res.status(status).json({ message });
  }
}
