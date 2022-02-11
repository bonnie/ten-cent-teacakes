import { testApiHandler } from "next-test-api-route-handler";

import showHandler from "@/pages/api/shows/[id]";
import venueHandler from "@/pages/api/venues/[id]";

test.each([
  {
    item: "venue",
    handler: venueHandler,
  },
  {
    item: "show",
    handler: showHandler,
  },
])("test retrieving $item by id", async ({ handler }) => {
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
