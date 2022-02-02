import { Instrument } from ".prisma/client";

import { AxiosResponse } from "axios";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";
import {
  InstrumentPatchArgs,
  InstrumentPutData,
  InstrumentResponse,
  InstrumentWithMusicianCount,
} from "./types";

/* * methods * */
export const fetchInstruments = async (): Promise<
  Array<InstrumentWithMusicianCount>
> => {
  const { data } = await axiosInstance.get(`/api/${routes.instruments}`);
  return data;
};

export const addInstrument = async (
  data: InstrumentPutData,
): Promise<InstrumentResponse> => {
  const { data: instrument } = await axiosInstance.put<
    { body: InstrumentPutData },
    AxiosResponse<Instrument>
  >(`/api/${routes.instruments}`, { body: data });
  return { instrument };
};

export const patchInstrument = async ({
  id,
  data,
}: InstrumentPatchArgs): Promise<InstrumentResponse> => {
  const { data: instrument } = await axiosInstance.patch<
    { body: InstrumentPutData },
    AxiosResponse<Instrument>
  >(`/api/${routes.instruments}/${id}`, { body: data });
  return { instrument };
};

export const deleteInstrument = async (id: number): Promise<void> =>
  axiosInstance.delete(`/api/${routes.instruments}/${id}`);
