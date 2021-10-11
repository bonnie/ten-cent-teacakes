/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";

type InstrumentData = {
  name: string;
};

type NewOrExistingInstrument = {
  instrumentId?: number;
  instrumentData?: InstrumentData;
};

type MusicianPutData = {
  firstName: string;
  lastName: string;
  bio: string;
  imagePath: string;
  instruments: Array<NewOrExistingInstrument>;
};

const generateInstrumentData = (
  instruments: Array<NewOrExistingInstrument>,
) => {
  // connect to instrument if id was provided; otherwise create a new one
  const connectInstruments = instruments
    .filter((instrument) => instrument.instrumentId)
    .map((instrument) => ({ id: instrument.instrumentId }));
  const createInstruments = instruments
    .filter((instrument) => instrument.instrumentData)
    .map((instrument) => {
      // filter should take care of this; simply satisfying typescript
      if (!instrument.instrumentData)
        throw new Error("trying to create instrument without data");
      return instrument.instrumentData;
    });
  return { create: createInstruments, connect: connectInstruments };
};

export const getMusiciansSortAscending = () =>
  prisma.musician.findMany({
    orderBy: { lastName: "asc" },
  });

export const addMusician = (rawData: MusicianPutData) => {
  const { firstName, lastName, bio, imagePath, instruments } = rawData;
  const instrumentsData = generateInstrumentData(instruments);

  const data: Prisma.MusicianCreateInput = {
    firstName,
    lastName,
    bio,
    imagePath,
    instruments: instrumentsData,
  };

  return prisma.musician.create({ data });
};

export const getMusicianById = async (id: number) => {
  prisma.musician.findUnique({ where: { id } });
};

export const deleteMusician = async (id: number) => {
  prisma.musician.delete({ where: { id } });
};
