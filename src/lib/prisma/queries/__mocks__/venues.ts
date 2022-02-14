import { Venue } from "@prisma/client";

import { mockVenues, mockVenuesWithShowCount } from "@/__mocks__/mockData";
import {
  VenuePatchData,
  VenuePutData,
  VenueWithShowCount,
} from "@/lib/venues/types";

module.exports = {
  ...jest.requireActual("../venues"),
  esModule: true,
  getVenues: (): Promise<Array<VenueWithShowCount>> =>
    Promise.resolve(mockVenuesWithShowCount),
  getVenueById: (id: number): Promise<Venue> => Promise.resolve(mockVenues[id]),
  addVenue: (data: VenuePutData): Promise<Venue> =>
    Promise.resolve(mockVenues[0]), // actually add venue?!?
  patchVenue: ({ id, data }: VenuePatchData): Promise<Venue> =>
    Promise.resolve(mockVenues[id]), // actually patch venue?!?
  deleteVenue: (id: number): Promise<Venue> => Promise.resolve(mockVenues[id]), // actually delete venue?!?
};
