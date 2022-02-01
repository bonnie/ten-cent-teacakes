/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import { MusicianPatchArgs, MusicianPutData } from "@/lib/musicians/types";
import prisma from "@/lib/prisma";

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
    imagePath,
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

  // need to explicitly disconnect any removed instruments
  // Two queries is inefficient, but code is a mess if I try to unify it with
  // create (due to types), and this should be an uncommon action
  const removedIds = existingInstrumentIds.filter(
    (id) => !instrumentIds?.includes(id),
  );
  if (removedIds.length > 0) {
    await prisma.musician.update({
      data: {
        instruments: {
          disconnect: removedIds.map((id) => ({ id })),
        },
      },
      where: { id },
    });
  }

  const patchData = transformData({
    firstName: firstName ?? musicianData.firstName,
    lastName: lastName ?? musicianData.lastName,
    bio: bio ?? musicianData.bio,
    imagePath: imagePath ?? musicianData.imagePath,
    instrumentIds: instrumentIds ?? existingInstrumentIds,
  });

  return prisma.musician.update({ data: patchData, where: { id } });
};
