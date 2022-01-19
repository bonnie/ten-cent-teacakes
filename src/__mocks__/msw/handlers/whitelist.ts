import { rest } from "msw";

import { mockWhitelist } from "../mockData";

export const whitelistHandlers = [
  rest.get("http://localhost/api/auth/whitelist", (req, res, ctx) =>
    res(ctx.json({ whitelist: mockWhitelist })),
  ),
];
