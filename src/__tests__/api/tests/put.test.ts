import { Instrument, Venue } from "@prisma/client";

import dayjs from "dayjs";
import { testApiHandler } from "next-test-api-route-handler";

import { InstrumentPutData } from "@/lib/instruments/types";
import {
  MusicianPutData,
  MusicianWithInstruments,
} from "@/lib/musicians/types";
import { PhotoPutData, PhotoWithShowAndVenue } from "@/lib/photos/types";
import { getInstruments } from "@/lib/prisma/queries/instruments";
import { getShows } from "@/lib/prisma/queries/shows";
import { getVenues } from "@/lib/prisma/queries/venues";
import { ShowPutData, ShowWithVenue } from "@/lib/shows/types";
import { VenuePutData } from "@/lib/venues/types";
import instrumentHandler from "@/pages/api/instruments";
import musicianHandler from "@/pages/api/musicians";
import photoHandler from "@/pages/api/photos";
import showHandler from "@/pages/api/shows";
import venueHandler from "@/pages/api/venues";

export const today = dayjs().toDate();

// ------------------------------------------------------------------ //
// EXPECTED GET DATA
//
// ids don't reset after deleteMany, so actual number is not predictable depending
// on which tests ran before this one.

const generateMinVenuePutData = (): VenuePutData => ({
  name: "New Min Venue",
});

const generateMaxVenuePutData = (): VenuePutData => ({
  name: "New Max Venue",
  url: "http://newvenue.com",
});

const generateMinShowPutData = async (): Promise<ShowPutData> => {
  const venues = await getVenues();
  return {
    performAt: today,
    venueId: venues[0].id,
  };
};

const generateMaxShowPutData = async (): Promise<ShowPutData> => {
  const venues = await getVenues();
  return {
    performAt: today,
    venueId: venues[0].id,
    url: "https://venue1.url/show",
  };
};

const generateInstrumentData = (): InstrumentPutData => ({
  name: "keytar",
});

const generateMusicianData = async (): Promise<MusicianPutData> => {
  const instruments = await getInstruments();
  return {
    firstName: "Minnie",
    lastName: "Musician",
    bio: "Minnie is a good musician",
    imagePath: "musicians/minnie.jpg",
    instrumentIds: instruments.slice(3).map((instrument) => instrument.id),
  };
};

const generateMinPhotoData = (): PhotoPutData => ({
  imagePath: "photos/uploadedMinPhoto.jpg",
});

const generateMaxPhotoData = async (): Promise<PhotoPutData> => {
  const shows = await getShows();
  return {
    showId: shows[0].id,
    imagePath: "photos/uploadedMaxPhoto.jpg",
    photographer: "Jane A Photographer",
    description: "Photo to the max",
    takenAt: today.toISOString(),
  };
};
// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
  {
    item: "min venue data",
    handler: venueHandler,
    generatePutData: generateMinVenuePutData,
    filterFunction: (venue: Venue) => venue.name === "New Min Venue",
  },
  {
    item: "max venue data",
    handler: venueHandler,
    generatePutData: generateMaxVenuePutData,
    filterFunction: (venue: Venue) => venue.name === "New Max Venue",
  },
  {
    item: "min show data",
    handler: showHandler,
    generatePutData: generateMinShowPutData,
    filterFunction: (show: { performAt: string }) =>
      show.performAt === today.toISOString(),
  },
  {
    item: "max show data",
    handler: showHandler,
    generatePutData: generateMaxShowPutData,
    filterFunction: (show: ShowWithVenue) =>
      show.url === "https://venue1.url/show",
  },
  {
    item: "instrument data",
    handler: instrumentHandler,
    generatePutData: generateInstrumentData,
    filterFunction: (instrument: Instrument) => instrument.name === "keytar",
  },
  {
    item: "musician data",
    handler: musicianHandler,
    generatePutData: generateMusicianData,
    filterFunction: (musician: MusicianWithInstruments) =>
      musician.firstName === "Minnie",
  },
  {
    item: "photo min data",
    handler: photoHandler,
    generatePutData: generateMinPhotoData,
    filterFunction: (photo: PhotoWithShowAndVenue) =>
      photo.imagePath === "photos/uploadedMinPhoto.jpg",
  },
  {
    item: "photo max data",
    handler: photoHandler,
    generatePutData: generateMaxPhotoData,
    filterFunction: (photo: PhotoWithShowAndVenue) =>
      photo.imagePath === "photos/uploadedMaxPhoto.jpg",
  },
];

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)(
  "adds new $item",
  async ({ handler, generatePutData, filterFunction }) => {
    // part 1: PUT request to add new item
    const putData = await generatePutData();

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ data: putData }),
        });
        expect(res.status).toEqual(200);
      },
    });

    // part 2: GET request to verify added item
    // TODO: different test for APIs that have GET /[id] ?
    await testApiHandler({
      handler,
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
