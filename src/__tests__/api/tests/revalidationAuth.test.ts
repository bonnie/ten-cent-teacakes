import { testApiHandler } from "next-test-api-route-handler";

import showIdHandler from "@/pages/api/shows/[id]";
import showsHandler from "@/pages/api/shows/index";

test("PUT /api/shows returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = { secret: "NOT THE REAL SECRET" };
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "PUT" });
      expect(res.status).toEqual(401);
    },
  });
});

test("PATCH /api/shows/:id returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = { secret: "NOT THE REAL SECRET" };
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "PATCH" });
      expect(res.status).toEqual(401);
    },
  });
});

test("DELETE /api/shows/:id returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = { secret: "NOT THE REAL SECRET" };
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "DELETE" });
      expect(res.status).toEqual(401);
    },
  });
});

test("GET /api/shows/:id DOES NOT return 401 status for missing revalidation secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toEqual(200);
    },
  });
});
