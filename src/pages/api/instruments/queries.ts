import {
  InstrumentPatchData,
  InstrumentPutData,
  InstrumentWithMusicianCount,
} from "@/lib/instruments/types";
import prisma from "@/lib/prisma";

export const getInstruments = async (): Promise<
  Array<InstrumentWithMusicianCount>
> => {
  const instruments = await prisma.instrument.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { musicians: true },
      },
    },
  });
  return instruments.map((i) => ({
    id: i.id,
    name: i.name,
    // eslint-disable-next-line no-underscore-dangle
    musicianCount: i._count?.musicians ?? 0,
  }));
};

export const getInstrumentById = (id: number) =>
  prisma.instrument.findUnique({ where: { id } });

export const addInstrument = async (data: InstrumentPutData) => {
  await prisma.instrument.create({
    data: { name: data.name },
  });
  return prisma.instrument.findUnique({ where: { name: data.name } });
};

export const patchInstrument = async ({ data, id }: InstrumentPatchData) => {
  const instrumentData = await getInstrumentById(id);
  if (!instrumentData) {
    throw new Error(`Bad instrument id: ${id}`);
  }

  const newInstrument = await prisma.instrument.update({
    data,
    where: { id },
  });
  return newInstrument;
};

export const deleteInstrument = async (id: number) => {
  await prisma.instrument.delete({ where: { id } });
};
