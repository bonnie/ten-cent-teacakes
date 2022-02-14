import { Venue } from "@prisma/client";

import dayjs from "dayjs";
import { testApiHandler } from "next-test-api-route-handler";

import { getVenues } from "@/lib/prisma/queries/venues";
import { ShowPutData } from "@/lib/shows/types";
import { VenuePutData, VenueWithShowCount } from "@/lib/venues/types";
import showHandler from "@/pages/api/shows";
import venueHandler from "@/pages/api/venues";

export const today = dayjs().toDate();

// ------------------------------------------------------------------ //
// EXPECTED GET DATA
//
// ids don't reset after deleteMany, so actual number is not predictable depending
// on which tests ran before this one.

export const generateVenuePutData = (): VenuePutData => ({
  name: "New Venue",
  url: "http://newvenue.com",
});

export const generateShowPutData = async (): Promise<ShowPutData> => {
  const venues = await getVenues();
  return {
    performAt: today,
    venueId: venues[0].id,
    url: "https://venue1.url/show",
  };
};

// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
  {
    item: "venue",
    handler: venueHandler,
    generatePutData: generateVenuePutData,
    filterFunction: (venue: Venue) => venue.name === "New Venue",
    extraAssertions: (newItemArray: Array<VenueWithShowCount>) =>
      expect(newItemArray[0].showCount).toBe(0),
  },
  {
    item: "show",
    handler: showHandler,
    generatePutData: generateShowPutData,
    filterFunction: (show: { performAt: string }) =>
      show.performAt === today.toISOString(),
  },
];

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)(
  "adds new $item",
  async ({ handler, generatePutData, filterFunction, extraAssertions }) => {
    // part 1: PUT request to add new item
    // TODO: different tests for "contains optional data" vs. doesn't contain optional data
    const putData = await generatePutData();

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ body: putData }),
        });
        expect(res.status).toEqual(201);
      },
    });

    // part 2: GET request to verify added item
    // TODO: different test for APIs that have GET /[id] ?
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
        });
        const json = await res.json();
        const newItemArray = json.filter(filterFunction);
        expect(newItemArray).toHaveLength(1);
        if (extraAssertions) extraAssertions(newItemArray);
      },
    });
  },
);
