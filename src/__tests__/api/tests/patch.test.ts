import { Instrument, Musician, Photo, Venue } from "@prisma/client";

import dayjs from "dayjs";
import { testApiHandler } from "next-test-api-route-handler";

import { getInstruments } from "@/lib/prisma/queries/instruments";
import { getMusiciansSortAscending } from "@/lib/prisma/queries/musicians";
import { getPhotos } from "@/lib/prisma/queries/photos";
import { getShows } from "@/lib/prisma/queries/shows";
import { getVenues } from "@/lib/prisma/queries/venues";
import instrumentGetHandler from "@/pages/api/instruments";
import instrumentIdHandler from "@/pages/api/instruments/[id]";
import musicianGetHandler from "@/pages/api/musicians";
import musicianIdHandler from "@/pages/api/musicians/[id]";
import photoGetHandler from "@/pages/api/photos";
import photoIdHandler from "@/pages/api/photos/[id]";
import showGetHandler from "@/pages/api/shows";
import showIdHandler from "@/pages/api/shows/[id]";
import venueGetHandler from "@/pages/api/venues";
import venueIdHandler from "@/pages/api/venues/[id]";

const today = dayjs().toDate();
// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
  {
    item: "venue",
    idHandler: venueIdHandler,
    getHandler: venueGetHandler,
    getItems: getVenues,
    patchData: { name: "New Venue Name" },
    filterFunction: (item: Venue) => item.name === "New Venue Name",
  },
  {
    item: "show",
    idHandler: showIdHandler,
    getHandler: showGetHandler,
    getItems: getShows,
    patchData: { performAt: today },
    filterFunction: (item: { performAt: string }) =>
      item.performAt === today.toISOString(),
  },
  {
    item: "instrument",
    idHandler: instrumentIdHandler,
    getHandler: instrumentGetHandler,
    getItems: getInstruments,
    patchData: { name: "New Instrument Name" },
    filterFunction: (item: Instrument) => item.name === "New Instrument Name",
  },
  {
    item: "musician",
    idHandler: musicianIdHandler,
    getHandler: musicianGetHandler,
    getItems: getMusiciansSortAscending,
    patchData: { firstName: "New Musician Name" },
    filterFunction: (item: Musician) => item.firstName === "New Musician Name",
  },
  {
    item: "photo",
    idHandler: photoIdHandler,
    getHandler: photoGetHandler,
    getItems: getPhotos,
    patchData: { photographer: "New Photographer Name" },
    filterFunction: (item: Photo) =>
      item.photographer === "New Photographer Name",
  },
];

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)(
  "test patching $item",
  async ({
    idHandler,
    getHandler,
    getItems,
    patchData,
    filterFunction,
    item,
  }) => {
    // // part 1: PATCH request to add new item
    const items = await getItems();
    if (!items)
      throw new Error(`Could not complete test: did not find any ${item}s`);
    const { id } = items[0];
    await testApiHandler({
      handler: idHandler,
      paramsPatcher: (params) => {
        // eslint-disable-next-line no-param-reassign
        params.id = id;
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ data: patchData }),
        });
        expect(res.status).toEqual(200);
      },
    });
    // part 2: GET request to verify patched item
    await testApiHandler({
      handler: getHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
        });
        const json = await res.json();
        const newItemArray = json.filter(filterFunction);
        expect(newItemArray).toHaveLength(1);
      },
    });
  },
);
