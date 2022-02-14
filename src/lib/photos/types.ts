import { Photo, Show, Venue } from "@prisma/client";

export type PhotoFormData = {
  showId?: number;
  photoFile?: File;
  imagePath?: string;
  photographer?: string;
  description?: string;
  takenAt?: Date;
};

export type UploadedPhotoFormData = {
  showId?: number;
  imagePath?: string;
  photographer?: string;
  description?: string;
  takenAt?: Date;
};

export type PhotoPutData = {
  showId?: number;
  imagePath: string;
  photographer?: string;
  description?: string;
  takenAt?: string;
};

export type PhotoPatchData = {
  showId?: number;
  photographer?: string;
  description?: string;
  takenAt?: string;
};

export type PhotoPatchArgs = {
  id: number;
  data: PhotoPatchData;
};

export type PhotoWithShowAndVenue = Photo & {
  show?: Show | null;
  showVenue?: Venue | null;
  takenAt?: Date | null;
};
