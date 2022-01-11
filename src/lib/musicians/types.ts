import { Musician } from ".prisma/client";

export type InstrumentName = { name: string };
export type MusicianWithInstruments = Musician & {
  instruments: Array<InstrumentName>;
};
