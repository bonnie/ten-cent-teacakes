import { Venue } from ".prisma/client";

export type VenueResponse = { venue: Venue };

export type VenuePutData = { name: string; url?: string };

export type VenuePatchData = {
  body: VenuePutData;
  id: number;
};

export type VenuePatchArgs = {
  id: number;
  data: VenuePatchData;
};
