import { Show, Venue } from ".prisma/client";

export type ShowWithVenue = Show & {
  venue: Venue;
};

export type ShowFormData = {
  venueId: number | undefined;
  performDate: string;
  performTime: string;
  url?: string;
};

export type ShowPutData = { performAt: Date; venueId: number; url?: string };

export type ShowPatchData = {
  performAt?: Date;
  venueId?: number;
  url?: string;
};
export type ShowPatchArgs = {
  id: number;
  data: ShowPatchData;
};

export type SortedShows = {
  upcomingShows: Array<ShowWithVenue>;
  pastShows: Array<ShowWithVenue>;
};
