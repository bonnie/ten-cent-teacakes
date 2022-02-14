import dayjs from "dayjs";
import { testApiHandler } from "next-test-api-route-handler";

import {
  addInstrument,
  getInstruments,
} from "@/lib/prisma/queries/instruments";
import { getMusiciansSortAscending } from "@/lib/prisma/queries/musicians";
import { getPhotos } from "@/lib/prisma/queries/photos";
import { addShow } from "@/lib/prisma/queries/shows";
import { addVenue, getVenues } from "@/lib/prisma/queries/venues";
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

// ------------------------------------------------------------------ //
// ID to delete

// venue, instrument, and show need to create first to ensure no dependencies
const getVenueId = async () => {
  const venue = await addVenue({ name: "delete me!" });
  if (!venue) throw new Error("Failed to create venue for deletion");
  return venue.id;
};
const getShowId = async () => {
  const venues = await getVenues();
  const venueId = venues[0].id;
  const show = await addShow({ venueId, performAt: dayjs().toDate() });
  if (!show) throw new Error("Failed to create show for deletion");
  return show.id;
};
const getInstrumentId = async () => {
  const instrument = await addInstrument({ name: "delete me!" });
  if (!instrument) throw new Error("Failed to create instrument for deletion");
  return instrument.id;
};

// musician and photos have no dependencies
const getMusicianId = async () => {
  const Musicians = await getMusiciansSortAscending();
  return Musicians[0].id;
};
const getPhotoId = async () => {
  const venues = await getPhotos();
  return venues[0].id;
};

// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
  {
    item: "venue",
    idHandler: venueIdHandler,
    getHandler: venueGetHandler,
    getItemId: getVenueId,
  },
  {
    item: "show",
    idHandler: showIdHandler,
    getHandler: showGetHandler,
    getItemId: getShowId,
  },
  {
    item: "instrument",
    idHandler: instrumentIdHandler,
    getHandler: instrumentGetHandler,
    getItemId: getInstrumentId,
  },
  {
    item: "musician",
    idHandler: musicianIdHandler,
    getHandler: musicianGetHandler,
    getItemId: getMusicianId,
  },
  {
    item: "photo",
    idHandler: photoIdHandler,
    getHandler: photoGetHandler,
    getItemId: getPhotoId,
  },
];

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)(
  "test deleting $item by id",
  async ({ idHandler, getHandler, getItemId }) => {
    // part 1: DELETE request to add new item
    const id = await getItemId();
    await testApiHandler({
      handler: idHandler,
      paramsPatcher: (params) => {
        // eslint-disable-next-line no-param-reassign
        params.id = id;
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "DELETE",
        });
        expect(res.status).toEqual(204);
      },
    });
    // // part 2: GET request to verify deleted item
    await testApiHandler({
      handler: getHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
        });
        const json = await res.json();
        const itemsWithMatchingId = json.filter(
          (item: { id: number }) => item.id === id,
        );
        expect(itemsWithMatchingId).toHaveLength(0);
      },
    });
  },
);
