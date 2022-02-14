import { Venue } from "@prisma/client";

import dayjs from "dayjs";

import { ShowWithVenue } from "@/lib/shows/types";
import { VenueWithShowCount } from "@/lib/venues/types";

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
