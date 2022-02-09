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
      expect(json).toEqual([
        { id: 1, name: "Venue 1", url: null, showCount: 0 },
        { id: 2, name: "Venue 2", url: "http://venue.com", showCount: 1 },
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
      const res = await fetch({ method: "PUT" });
      const status = await res.status();
      expect(status).toEqual(200);
    },
  });

  // part 2: GET request to verify added venue
  // TODO: different test for APIs that have GET /[id] ?
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET", data: venuePutData });
      const json = await res.json();
      const newVenue = json.filter(
        (venue: Venue) => venue.name === "New Venue",
      );
      expect(newVenue).toHaveLength(1);
    },
  });
});
