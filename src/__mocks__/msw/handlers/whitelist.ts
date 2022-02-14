import { rest } from "msw";

import { mockWhitelist } from "@/__mocks__/mockData";

export const whitelistHandlers = [
  rest.get("http://localhost:3000/api/auth/whitelist", (req, res, ctx) =>
    res(ctx.json({ whitelist: mockWhitelist })),
  ),
];
