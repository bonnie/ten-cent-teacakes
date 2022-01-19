import { rest } from "msw";

import { mockShows } from "../mockData";

export const showHandlers = [
  rest.get("http://localhost/api/shows", (req, res, ctx) =>
    res(ctx.json({ shows: mockShows })),
  ),
];
