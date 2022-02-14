import { testApiHandler } from "next-test-api-route-handler";

import showHandler from "@/pages/api/shows/[id]";
import venueHandler from "@/pages/api/venues/[id]";

// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
  {
    item: "venue",
    handler: venueHandler,
  },
  {
    item: "show",
    handler: showHandler,
  },
];

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)("test retrieving $item by id", async ({ handler }) => {
  // await testApiHandler({
  //   handler,
  //   test: async ({ fetch }) => {
  //     const res = await fetch({
  //       method: "GET",
  //     });
  //     const json = await res.json();
  //   },
  // });
});
