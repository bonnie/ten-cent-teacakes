import { Instrument, Musician } from ".prisma/client";

export type InstrumentName = { name: string };
export type MusicianWithInstruments = Musician & {
  instruments: Array<Instrument>;
};

export type MusicianResponse = {
  musician: Musician;
};

export type MusicianFormData = {
  imageFile?: File;
  firstName?: string;
  lastName?: string;
  bio?: string;
  instrumentIds?: Array<number>;
  imageWidth?: number;
  imageHeight?: number;
};

export type MusicianPutData = MusicianFormData & {
  imagePath?: string;
};

export type MusicianPatchArgs = {
  id: number;
  data: MusicianPutData;
};
