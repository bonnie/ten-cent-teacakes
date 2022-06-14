import { Instrument, Musician, Photo, Show, Venue } from "@prisma/client";

import { InstrumentPutData } from "../instruments/types";
import { MusicianPutData } from "../musicians/types";
import { PhotoPutData, PhotoWithShowAndVenue } from "../photos/types";
import { ShowPutData } from "../shows/types";
import { VenuePutData } from "../venues/types";

/// PATCH ////
type ItemUpdateFunctionGeneric<Data, ReturnData> = ({
  data,
  id,
}: {
  data: Data;
  id: number;
}) => Promise<ReturnData>;

export type ItemPatchFunction =
  | ItemUpdateFunctionGeneric<MusicianPutData, Musician>
  | ItemUpdateFunctionGeneric<PhotoPutData, Photo>
  | ItemUpdateFunctionGeneric<ShowPutData, Show>
  | ItemUpdateFunctionGeneric<VenuePutData, Venue>
  | ItemUpdateFunctionGeneric<InstrumentPutData, Instrument>;

/// GET BY ID ////
export type ItemGetByIdFunction = (
  id: number,
) => Promise<PhotoWithShowAndVenue | Venue | null>;

/// PUT / ADD ////
export type ItemAddFunctionGeneric<Data, ReturnData> = (
  data: Data,
) => Promise<ReturnData | null>;

export type ItemAddFunction =
  | ItemAddFunctionGeneric<MusicianPutData, Musician>
  | ItemAddFunctionGeneric<PhotoPutData, Photo>
  | ItemAddFunctionGeneric<ShowPutData, Show>
  | ItemAddFunctionGeneric<VenuePutData, Venue>
  | ItemAddFunctionGeneric<InstrumentPutData, Instrument>;
