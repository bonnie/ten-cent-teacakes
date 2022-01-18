import { rest } from "msw";

import { mockShows } from "../mockData";

export const showHandlers = [
  rest.post("/shows", (req, res, ctx) => res(ctx.json({ shows: mockShows }))),
];
