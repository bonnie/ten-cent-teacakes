import { testApiHandler } from "next-test-api-route-handler";

import handler from "@/pages/api/venues";

test("fetches all venues", async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      console.log(await res.json());
    },
  });
});
