import { Venue } from "@prisma/client";

import { testApiHandler } from "next-test-api-route-handler";

import handler from "@/pages/api/venues";

import { venuePutData } from "../api-data";

test("fetches all venues", async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      const json = await res.json();

      // ids don't reset after deleteMany, so actual number is not predictable depending
      // on which tests ran before this one.
      expect(json).toEqual([
        {
          id: json[0].id,
          name: "Venue 1",
          url: "http://venue1.com",
          showCount: 2,
        },
        { id: json[1].id, name: "Venue 2", url: null, showCount: 1 },
      ]);
    },
  });
});

test("adds new venue", async () => {
  // part 1: PUT request to add new venue
  // TODO: different tests for "contains optional data" vs. doesn't contain optional data
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ body: venuePutData }),
      });
      expect(res.status).toEqual(201);
    },
  });

  // part 2: GET request to verify added venue
  // TODO: different test for APIs that have GET /[id] ?
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      const json = await res.json();
      const newVenueArray = json.filter(
        (venue: Venue) => venue.name === "New Venue",
      );
      expect(newVenueArray).toHaveLength(1);
      expect(newVenueArray[0].showCount).toBe(0);
    },
  });
});
