import { Photo, Venue } from "@prisma/client";

export type PhotoFormData = {
  showId?: number;
  photoFile?: File;
  photographer?: string;
};

export type PhotoPutData = {
  showId?: number;
  imagePath: string;
  photographer?: string;
};

export type PhotoPatchData = {
  showId?: number;
  photographer?: string;
};

export type PhotoPatchArgs = {
  id: number;
  data: PhotoPatchData;
};

export type PhotoWithShowAndVenue = Photo & {
  showVenue?: Venue;
};
