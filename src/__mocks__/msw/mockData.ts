import { Venue } from "@prisma/client";

import { ShowWithVenue } from "@/lib/shows/types";

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

export const mockShows: Array<ShowWithVenue> = [
  {
    id: 1,
    performAt: new Date(),
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
];
