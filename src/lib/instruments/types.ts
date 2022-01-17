import { Instrument } from ".prisma/client";

export type InstrumentResponse = { instrument: Instrument };

export type InstrumentPutData = { name: string };

export type InstrumentPatchData = {
  data: InstrumentPutData;
  id: number;
};

export type InstrumentPatchArgs = {
  id: number;
  data: InstrumentPutData;
};

export type InstrumentWithMusicianCount = Instrument & {
  musicianCount: number;
};
