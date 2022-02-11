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
  // // part 1: DELETE request to add new item
  // await testApiHandler({
  //   handler,
  //   test: async ({ fetch }) => {
  //     const res = await fetch({
  //       method: "DELETE",
  //     });
  //     expect(res.status).toEqual(204);
  //   },
  // });
  // // part 2: GET request to verify deleted item
  // // TODO: different test for APIs that have GET /[id] ?
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
