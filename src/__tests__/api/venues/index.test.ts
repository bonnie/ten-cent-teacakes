import { testApiHandler } from "next-test-api-route-handler";

import handler from "@/pages/api/venues";

// jest.mock("@/lib/prisma/queries/venues");

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
