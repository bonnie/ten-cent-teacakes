/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import { MusicianPatchArgs, MusicianPutData } from "@/lib/musicians/types";
import prisma from "@/lib/prisma";
import { removePublicDir } from "@/lib/queries";

type MusicianEditData = {
  imagePath: string;
  firstName: string;
  lastName: string;
  bio: string;
  instrumentIds: Array<number>;
};

const transformData = (
  rawData: MusicianEditData,
): Prisma.MusicianCreateInput => {
  const { firstName, lastName, bio, imagePath, instrumentIds } = rawData;

  return {
    firstName,
    lastName,
    bio,
    imagePath: removePublicDir(imagePath),
    instruments: {
      connect: instrumentIds.map((id) => ({ id })),
    },
  };
};

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
    throw new Error(`Not enough data to add/update Musician: ${rawData}`);
  }

  const data = transformData({
    firstName,
    lastName,
    bio,
    imagePath,
    instrumentIds,
  });
  return prisma.musician.create({ data });
};

export const getMusicianById = (id: number) =>
  prisma.musician.findUnique({ where: { id }, include: { instruments: true } });

export const deleteMusician = (id: number) =>
  prisma.musician.delete({ where: { id } });

export const patchMusician = async ({ data, id }: MusicianPatchArgs) => {
  const musicianData = await getMusicianById(id);
  if (!musicianData) {
    throw new Error(`Bad musician id: ${id}`);
  }
  const { firstName, lastName, bio, imagePath, instrumentIds } = data;

  const existingInstrumentIds: Array<number> = musicianData.instruments
    ? musicianData.instruments.map((i) => i.id)
    : [];
  const patchData = transformData({
    firstName: firstName ?? musicianData.firstName,
    lastName: lastName ?? musicianData.lastName,
    bio: bio ?? musicianData.bio,
    imagePath: imagePath ?? musicianData.imagePath,
    instrumentIds: instrumentIds ?? existingInstrumentIds,
  });

  await prisma.photo.update({ data: patchData, where: { id } });
};
