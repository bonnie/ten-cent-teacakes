/* eslint-disable no-param-reassign */
import prisma from "../../../lib/prisma";
import { Prisma } from ".prisma/client";

type PhotoPutData = { eventId: number; imagePath: string };

export const getPhotosSortDescending = () =>
  prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });

export const addPhoto = ({ imagePath, eventId }: PhotoPutData) => {
  const data: Prisma.PhotoCreateInput = {
    imagePath,
    event: { connect: { id: eventId } },
  };

  return prisma.photo.create({ data });
};

export const getPhotoById = (id: number) =>
  prisma.photo.findUnique({ where: { id } });

export const deletePhoto = async (id: number) => {
  prisma.photo.delete({ where: { id } });
};
