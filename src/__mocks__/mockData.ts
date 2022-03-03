import dayjs from "dayjs";

import { InstrumentWithMusicianCount } from "@/lib/instruments/types";
import { MusicianWithInstruments } from "@/lib/musicians/types";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { ShowWithVenue } from "@/lib/shows/types";
import { VenueWithShowCount } from "@/lib/venues/types";

// set the time to avoid millisecond differences that cause flakiness
export const yesterday = dayjs()
  .subtract(1, "day")
  .set("hour", 10)
  .set("minute", 0)
  .set("second", 0)
  .set("millisecond", 0)
  .toDate();
export const lastMonth = dayjs()
  .subtract(1, "month")
  .set("hour", 10)
  .set("minute", 0)
  .set("second", 0)
  .set("millisecond", 0)
  .toDate();
export const tomorrow = dayjs()
  .add(1, "day")
  .set("hour", 10)
  .set("minute", 0)
  .set("second", 0)
  .set("millisecond", 0)
  .toDate();
export const nextMonth = dayjs()
  .add(1, "month")
  .set("hour", 10)
  .set("minute", 0)
  .set("second", 0)
  .set("millisecond", 0)
  .toDate();

export const mockWhitelist = ["test@test.com"];

export const mockVenues: Array<VenueWithShowCount> = [
  {
    id: 1,
    name: "Venue 1",
    url: null,
    showCount: 2,
  },
  {
    id: 2,
    name: "Venue 2",
    url: "http://venue.com",
    showCount: 1,
  },
  {
    id: 3,
    name: "Venue 3",
    url: "http://venue3.com",
    showCount: 0,
  },
];
export const mockOnlyPastShows: Array<ShowWithVenue> = [
  {
    id: 2,
    performAt: yesterday,
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

export const mockShows: Array<ShowWithVenue> = [
  {
    id: 1,
    performAt: dayjs("2200-01-01").toDate(),
    venueId: 1,
    url: null,
    venue: mockVenues[0],
  },
  ...mockOnlyPastShows,
];

export const mockManyFutureShows = [
  {
    id: 1,
    performAt: dayjs("2200-01-01").toDate(),
    venueId: 1,
    url: null,
    venue: mockVenues[0],
  },
  { id: 2, performAt: nextMonth, venueId: 1, url: null, venue: mockVenues[0] },
  {
    id: 3,
    performAt: tomorrow,
    venueId: 2,
    url: "http://venue.com/show",
    venue: mockVenues[1],
  },
  {
    id: 4,
    performAt: dayjs("2300-01-01").toDate(),
    venueId: 1,
    url: null,
    venue: mockVenues[0],
  },
];

export const mockInstruments: Array<InstrumentWithMusicianCount> = [
  { id: 1, name: "guitar", musicianCount: 1 },
  { id: 2, name: "baritone ukulele", musicianCount: 1 },
  { id: 3, name: "vocals", musicianCount: 3 },
  { id: 4, name: "bass", musicianCount: 1 },
  { id: 5, name: "kazoo", musicianCount: 1 },
  { id: 6, name: "fiddle", musicianCount: 1 },
  { id: 7, name: "tuba", musicianCount: 0 },
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
    imagePath: "photos/photo3.jpg",
    createdAt: yesterday,
    photographer: null,
    show: null,
    showId: null,
    takenAt: lastMonth,
    description: "this is Photo 3",
  },
  {
    id: 3,
    imagePath: "photos/photo1A.jpg",
    createdAt: yesterday,
    photographer: "Jane A Photographer",
    showId: 1,
    show: mockShows[2],
    showVenue: mockVenues[1],
    takenAt: yesterday,
    description: "This is Photo 1A",
  },
  {
    id: 4,
    imagePath: "photos/photo1C.jpg",
    createdAt: yesterday,
    photographer: "Jane A Photographer",
    showId: 1,
    show: mockShows[2],
    showVenue: mockVenues[1],
    takenAt: null,
    description: "This is Photo 1C",
  },
  {
    id: 5,
    imagePath: "photos/photo1B.jpg",
    createdAt: yesterday,
    photographer: "Jane A Photographer",
    showId: 1,
    show: mockShows[2],
    showVenue: mockVenues[1],
    takenAt: null,
    description: "This is Photo 1B",
  },
];
