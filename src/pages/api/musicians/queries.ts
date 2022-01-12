/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import { MusicianPutData } from "@/lib/musicians/types";
import prisma from "@/lib/prisma";
import { removePublicDir } from "@/lib/queries";

export const getMusiciansSortAscending = async () => {
  const musicians = await prisma.musician.findMany({
    include: { instruments: true },
    orderBy: { lastName: "asc" },
  });
  return musicians;
};

export const addMusician = (rawData: MusicianPutData) => {
  const { firstName, lastName, bio, imagePath, instrumentIds } = rawData;
  if (!firstName || !lastName || !bio || !imagePath || !instrumentIds) {
    throw new Error(`Not enough data to add Musician: ${rawData}`);
  }

  const data: Prisma.MusicianCreateInput = {
    firstName,
    lastName,
    bio,
    imagePath: removePublicDir(imagePath),
    instruments: {
      connect: instrumentIds.map((id) => ({ id })),
    },
  };

  return prisma.musician.create({ data });
};

export const getMusicianById = async (id: number) => {
  prisma.musician.findUnique({ where: { id } });
};

export const deleteMusician = async (id: number) => {
  prisma.musician.delete({ where: { id } });
};
