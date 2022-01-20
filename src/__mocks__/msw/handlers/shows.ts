import { rest } from "msw";

import { mockShows } from "../mockData";

export const showHandlers = [
  rest.get("http://localhost:3000/api/shows", (req, res, ctx) =>
    res(ctx.json({ shows: mockShows })),
  ),
];
