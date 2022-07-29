import { testApiHandler } from "next-test-api-route-handler";

import photosHandler from "@/pages/api/photos/index";

test("PUT /api/photos returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: photosHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = { secret: "NOT THE REAL SECRET" };
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "PUT" });
      expect(res.status).toEqual(401);
    },
  });
});

test("GET /api/photos DOES NOT return 401 status for missing revalidation secret", async () => {
  await testApiHandler({
    handler: photosHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toEqual(200);
    },
  });
});
