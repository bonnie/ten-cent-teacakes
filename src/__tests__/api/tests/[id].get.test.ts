import { testApiHandler } from "next-test-api-route-handler";

import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { getPhotos } from "@/lib/prisma/queries/photos";
import photoHandler from "@/pages/api/photos/[id]";

// ------------------------------------------------------------------ //
// EXPECTED GET DATA
//
// ids don't reset after deleteMany, so actual number is not predictable depending
// on which tests ran before this one.
const generatePhotoData = async (): Promise<PhotoWithShowAndVenue> => {
  const photos = await getPhotos();
  return photos[0];
};

// ------------------------------------------------------------------ //
// TEST DATA
// parametrizing in case there are other routes in the future with [id] GET
const testData = [
  {
    item: "photo",
    handler: photoHandler,
    generateData: generatePhotoData,
  },
];

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)(
  "test retrieving $item by id",
  async ({ handler, generateData }) => {
    const item = await generateData();

    await testApiHandler({
      handler,
      paramsPatcher: (params) => {
        // eslint-disable-next-line no-param-reassign
        params.id = item.id;
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
        });
        const json = await res.json();

        // TODO: more rigorous test here? Can't simply
        // match json with item, since json has ISO string dates
        // and item has Date dates
        expect(json.id).toEqual(item.id);
      },
    });
  },
);
