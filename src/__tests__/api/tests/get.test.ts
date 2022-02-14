import { testApiHandler } from "next-test-api-route-handler";

import { InstrumentWithMusicianCount } from "@/lib/instruments/types";
import { MusicianWithInstruments } from "@/lib/musicians/types";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { ShowWithVenue } from "@/lib/shows/types";
import { VenueWithShowCount } from "@/lib/venues/types";
import instrumentHandler from "@/pages/api/instruments";
import musicianHandler from "@/pages/api/musicians";
import photoHandler from "@/pages/api/photos";
import showHandler from "@/pages/api/shows";
import venueHandler from "@/pages/api/venues";

import { nextMonth, tomorrow, yesterday } from "../../prisma/reset-db";

// ------------------------------------------------------------------ //
// EXPECTED GET DATA
//
// ids don't reset after deleteMany, so actual number is not predictable depending
// on which tests ran before this one.
const generateExpectedVenues = (json: Array<VenueWithShowCount>) => [
  {
    id: json[0].id,
    name: "Venue 1",
    url: "http://venue1.com",
    showCount: 2,
  },
  { id: json[1].id, name: "Venue 2", url: null, showCount: 1 },
];

const generateExpectedShows = (json: Array<ShowWithVenue>) => [
  {
    id: json[0].id,
    performAt: nextMonth.toISOString(),
    url: null,
    venue: {
      id: json[0].venue.id,
      name: "Venue 2",
      url: null,
    },
    venueId: json[0].venue.id,
  },
  {
    id: json[1].id,
    performAt: tomorrow.toISOString(),
    url: `http://venue1.com/show2`,
    venue: {
      id: json[1].venue.id,
      name: "Venue 1",
      url: "http://venue1.com",
    },
    venueId: json[1].venue.id,
  },
  {
    id: json[2].id,
    performAt: yesterday.toISOString(),
    url: null,
    venue: {
      id: json[2].venue.id,
      name: "Venue 1",
      url: "http://venue1.com",
    },
    venueId: json[2].venue.id,
  },
];

const generateExpectedInstruments = (
  json: Array<InstrumentWithMusicianCount>,
) => [
  { id: json[0].id, name: "baritone ukulele", musicianCount: 1 },
  { id: json[1].id, name: "bass", musicianCount: 1 },
  { id: json[2].id, name: "fiddle", musicianCount: 1 },
  { id: json[3].id, name: "guitar", musicianCount: 1 },
  { id: json[4].id, name: "kazoo", musicianCount: 1 },
  { id: json[5].id, name: "vocals", musicianCount: 3 },
];

const generateExpectedMusicians = (json: Array<MusicianWithInstruments>) => [
  {
    id: json[0].id,
    firstName: "Sarah",
    lastName: "Gronquist",
    bio: "Music and dancing go hand in hand! Sarah's been dancing and playing swing guitar for the last decade, but during the quarantine of 2020, she started digging deeper into gypsy jazz and tango. She's usually got something from 1936 on her mind.",
    instruments: [
      { id: json[0].instruments[0].id, name: "guitar" },
      { id: json[0].instruments[1].id, name: "baritone ukulele" },
      { id: json[0].instruments[2].id, name: "vocals" },
    ],
    imagePath: "musicians/sarah.jpg",
  },
  {
    id: json[1].id,
    firstName: "Bonnie",
    lastName: "Schulkin",
    bio: "Bonnie's musical past includes an elementary school chorus solo in \"76 Trombones\" and a slightly less glamorous stint in the Fly Right Sisters as an adult. Bass is her ideal instrument, as it's heavy on theory and light on actual number of notes required.",
    instruments: [
      { id: json[1].instruments[0].id, name: "vocals" },
      { id: json[1].instruments[1].id, name: "bass" },
      { id: json[1].instruments[2].id, name: "kazoo" },
    ],
    imagePath: "musicians/bonnie.jpg",
  },
  {
    id: json[2].id,
    firstName: "Greg",
    lastName: "Urban",
    bio: "In what is perhaps an excess of caution, Greg is peaking late, rather than too early. He enthusiastically plays an eclectic mix of swing, Hank Williams, Celtic, and old-time fiddle. He also bakes teacakes.",
    instruments: [
      { id: json[2].instruments[0].id, name: "vocals" },
      { id: json[2].instruments[1].id, name: "fiddle" },
    ],
    imagePath: "musicians/greg.jpg",
  },
];

const generateExpectedPhotos = (json: Array<PhotoWithShowAndVenue>) => [
  {
    id: json[0].id,
    createdAt: json[0].createdAt,
    imagePath: "photos/photo2.jpg",
    photographer: null,
    show: null,
    showId: null,
    takenAt: null,
    description: null,
  },
  {
    id: json[1].id,
    imagePath: "photos/photoB3.jpg",
    createdAt: json[1].createdAt,
    photographer: null,
    show: null,
    showId: null,
    takenAt: yesterday.toISOString(),
    description: "this is Photo 3",
  },
  {
    id: json[2].id,
    imagePath: "photos/photoA1.jpg",
    createdAt: json[2].createdAt,
    photographer: "Jane A Photographer",
    showId: json[2].showId,
    show: json[2].show,
    showVenue: json[2].showVenue,
    takenAt: yesterday.toISOString(),
    description: "This is Photo 1",
  },
];

// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
  {
    endpoint: "venues",
    handler: venueHandler,
    generateExpectedData: generateExpectedVenues,
  },
  {
    endpoint: "shows",
    handler: showHandler,
    generateExpectedData: generateExpectedShows,
  },
  {
    endpoint: "instruments",
    handler: instrumentHandler,
    generateExpectedData: generateExpectedInstruments,
  },
  {
    endpoint: "musicians",
    handler: musicianHandler,
    generateExpectedData: generateExpectedMusicians,
  },
  {
    endpoint: "photos",
    handler: photoHandler,
    generateExpectedData: generateExpectedPhotos,
  },
];

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)(
  "fetches all $endpoint",
  async ({ handler, generateExpectedData }) => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: "GET" });
        const json = await res.json();
        expect(json).toEqual(generateExpectedData(json));
      },
    });
  },
);
