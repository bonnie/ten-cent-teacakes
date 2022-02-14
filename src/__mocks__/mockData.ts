import { Instrument, Venue } from "@prisma/client";

import dayjs from "dayjs";

import { MusicianWithInstruments } from "@/lib/musicians/types";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { ShowWithVenue } from "@/lib/shows/types";
import { VenueWithShowCount } from "@/lib/venues/types";

export const yesterday = dayjs().subtract(1, "day").toDate();
export const lastMonth = dayjs().subtract(1, "month").toDate();
export const tomorrow = dayjs().add(1, "day").toDate();
export const nextMonth = dayjs().add(1, "month").toDate();

export const mockWhitelist = ["test@test.com"];

export const mockVenues: Array<Venue> = [
  {
    id: 1,
    name: "Venue 1",
    url: null,
  },
  {
    id: 2,
    name: "Venue 2",
    url: "http://venue.com",
  },
];

export const mockVenuesWithShowCount: Array<VenueWithShowCount> =
  mockVenues.map((venue, index) => ({ ...venue, showCount: index }));

export const mockShows: Array<ShowWithVenue> = [
  {
    id: 1,
    performAt: dayjs("2200-01-01").toDate(),
    venueId: 1,
    url: null,
    venue: mockVenues[0],
  },
  {
    id: 2,
    performAt: new Date(),
    venueId: 2,
    url: "http://venue.com/show",
    venue: mockVenues[1],
  },
  {
    id: 3,
    performAt: dayjs("2021-01-01").toDate(),
    venueId: 2,
    url: null,
    venue: mockVenues[1],
  },
];

export const mockInstruments: Array<Instrument> = [
  { id: 1, name: "guitar" },
  { id: 2, name: "baritone ukulele" },
  { id: 3, name: "vocals" },
  { id: 4, name: "bass" },
  { id: 5, name: "kazoo" },
  { id: 6, name: "fiddle" },
];

export const mockMusicians: Array<MusicianWithInstruments> = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Gronquist",
    bio: "Music and dancing go hand in hand! Sarah's been dancing and playing swing guitar for the last decade, but during the quarantine of 2020, she started digging deeper into gypsy jazz and tango. She's usually got something from 1936 on her mind.",
    instruments: [mockInstruments[0], mockInstruments[1], mockInstruments[2]],
    imagePath: "musicians/sarah.jpg",
  },
  {
    id: 2,
    firstName: "Bonnie",
    lastName: "Schulkin",
    bio: "Bonnie's musical past includes an elementary school chorus solo in \"76 Trombones\" and a slightly less glamorous stint in the Fly Right Sisters as an adult. Bass is her ideal instrument, as it's heavy on theory and light on actual number of notes required.",
    instruments: [mockInstruments[2], mockInstruments[3], mockInstruments[4]],
    imagePath: "musicians/bonnie.jpg",
  },
  {
    id: 3,
    firstName: "Greg",
    lastName: "Urban",
    bio: "In what is perhaps an excess of caution, Greg is peaking late, rather than too early. He enthusiastically plays an eclectic mix of swing, Hank Williams, Celtic, and old-time fiddle. He also bakes teacakes.",
    instruments: [mockInstruments[2], mockInstruments[5]],
    imagePath: "musicians/greg.jpg",
  },
];

export const mockPhotos: Array<PhotoWithShowAndVenue> = [
  {
    id: 1,
    createdAt: yesterday,
    imagePath: "photos/photo2.jpg",
    photographer: null,
    show: null,
    showId: null,
    takenAt: null,
    description: null,
  },
  {
    id: 2,
    imagePath: "photos/photoB3.jpg",
    createdAt: yesterday,
    photographer: null,
    show: null,
    showId: null,
    takenAt: lastMonth,
    description: "this is Photo 3",
  },
  {
    id: 3,
    imagePath: "photos/photoA1.jpg",
    createdAt: yesterday,
    photographer: "Jane A Photographer",
    showId: 1,
    show: mockShows[0],
    showVenue: mockVenues[0],
    takenAt: yesterday,
    description: "This is Photo 1",
  },
];
