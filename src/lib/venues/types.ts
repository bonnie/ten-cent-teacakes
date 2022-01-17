import { Venue } from ".prisma/client";

export type VenueWithShowCount = Venue & { showCount: number };
export type VenueResponse = { venue: VenueWithShowCount };

export type VenuePutData = { name: string; url?: string };

export type VenuePatchData = {
  data: VenuePutData;
  id: number;
};

export type VenuePatchArgs = {
  id: number;
  data: VenuePutData;
};

export type VenuePatchResponse = {
  venue: Venue;
};
