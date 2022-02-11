import { testApiHandler } from "next-test-api-route-handler";

import { ShowWithVenue } from "@/lib/shows/types";
import { VenueWithShowCount } from "@/lib/venues/types";
import showHandler from "@/pages/api/shows";
import venueHandler from "@/pages/api/venues";

import { nextMonth, tomorrow, yesterday } from "../../prisma/reset-db";

// ------------------------------------------------------------------ //
// EXPECTED GET DATA
//
// ids don't reset after deleteMany, so actual number is not predictable depending
// on which tests ran before this one.
const generateExpectedVenues = (json: Array<VenueWithShowCount>) => [
  {
    id: json[0].id,
    name: "Venue 1",
    url: "http://venue1.com",
    showCount: 2,
  },
  { id: json[1].id, name: "Venue 2", url: null, showCount: 1 },
];

const generateExpectedShows = (json: Array<ShowWithVenue>) => [
  {
    id: json[0].id,
    performAt: nextMonth.toISOString(),
    url: null,
    venue: {
      id: json[0].venue.id,
      name: "Venue 2",
      url: null,
    },
    venueId: json[0].venue.id,
  },
  {
    id: json[1].id,
    performAt: tomorrow.toISOString(),
    url: `http://venue1.com/show2`,
    venue: {
      id: json[1].venue.id,
      name: "Venue 1",
      url: "http://venue1.com",
    },
    venueId: json[1].venue.id,
  },
  {
    id: json[2].id,
    performAt: yesterday.toISOString(),
    url: null,
    venue: {
      id: json[2].venue.id,
      name: "Venue 1",
      url: "http://venue1.com",
    },
    venueId: json[2].venue.id,
  },
];

// ------------------------------------------------------------------ //

test.each([
  {
    endpoint: "venues",
    handler: venueHandler,
    generateExpectedData: generateExpectedVenues,
  },
  {
    endpoint: "shows",
    handler: showHandler,
    generateExpectedData: generateExpectedShows,
  },
])("fetches all $endpoint", async ({ handler, generateExpectedData }) => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      const json = await res.json();
      expect(json).toEqual(generateExpectedData(json));
    },
  });
});
