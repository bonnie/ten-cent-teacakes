import { Instrument, Musician, Photo, Show, Venue } from "@prisma/client";

import { InstrumentPatchData } from "../instruments/types";
import { MusicianPutData } from "../musicians/types";
import { PhotoPatchData } from "../photos/types";
import { ShowPatchData } from "../shows/types";
import { VenuePatchData } from "../venues/types";

export type DbItem = Musician | Venue | Show | Instrument | Photo;
export type ItemPatchData =
  | InstrumentPatchData
  | MusicianPutData
  | PhotoPatchData
  | ShowPatchData
  | VenuePatchData;
export type ItemPatchArgs = {
  data: ItemPatchData;
  id: number;
};
