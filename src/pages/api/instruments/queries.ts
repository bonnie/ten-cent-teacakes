import {
  InstrumentPatchData,
  InstrumentPutData,
} from "@/lib/instruments/types";
import prisma from "@/lib/prisma";

export const getInstruments = () =>
  prisma.instrument.findMany({
    orderBy: { name: "asc" },
  });

export const getInstrumentById = (id: number) =>
  prisma.instrument.findUnique({ where: { id } });

export const addInstrument = async (data: InstrumentPutData) => {
  await prisma.instrument.create({
    data: { name: data.name },
  });
  return prisma.instrument.findUnique({ where: { name: data.name } });
};

export const patchInstrument = async ({ body, id }: InstrumentPatchData) => {
  const instrumentData = getInstrumentById(id);
  if (!instrumentData) {
    throw new Error(`Bad instrument id: ${id}`);
  }

  await prisma.instrument.update({ data: body, where: { id } });
};

export const deleteInstrument = async (id: number) => {
  await prisma.instrument.delete({ where: { id } });
};
