export type PhotoFormData = {
  showId?: number;
  file?: File;
  photographer?: string;
};

export type PhotoPutData = {
  showId?: number;
  file: File;
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
