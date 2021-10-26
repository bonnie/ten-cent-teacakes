import { Musician } from ".prisma/client";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";

/* * types * */
export type InstrumentName = { name: string };
export type MusicianWithInstruments = Musician & {
  instruments: Array<InstrumentName>;
};

/* * methods * */
export const fetchMusiciansWithInstruments = async (): Promise<
  Array<MusicianWithInstruments>
> => {
  const { data } = await axiosInstance.get(`/api/${routes.musicians}`);
  return data;
};
