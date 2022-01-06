export type PhotoFormData = {
  showId?: number;
  photoFile?: File;
  photographer?: string;
};

export type PhotoPutData = {
  showId?: number;
  photoFile: File;
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
