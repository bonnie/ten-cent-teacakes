import { rest } from "msw";

import {
  mockInstruments,
  mockMusicians,
  mockPhotos,
  mockShows,
  mockVenues,
  mockWhitelist,
} from "@/__mocks__/mockData";

export const getHandlers = [
  rest.get("http://localhost:3000/api/shows", (req, res, ctx) =>
    res(ctx.json(mockShows)),
  ),
  rest.get("http://localhost:3000/api/venues", (req, res, ctx) =>
    res(ctx.json(mockVenues)),
  ),
  rest.get("http://localhost:3000/api/photos", (req, res, ctx) =>
    res(ctx.json(mockPhotos)),
  ),
  rest.get("http://localhost:3000/api/instruments", (req, res, ctx) =>
    res(ctx.json(mockInstruments)),
  ),
  rest.get("http://localhost:3000/api/musicians", (req, res, ctx) =>
    res(ctx.json(mockMusicians)),
  ),
  rest.get("http://localhost:3000/api/auth/whitelist", (req, res, ctx) =>
    res(ctx.json({ whitelist: mockWhitelist })),
  ),
];
