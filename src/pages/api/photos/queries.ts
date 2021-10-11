/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";

type PhotoPutData = {
  eventId: number;
  imagePath: string;
  photographer: string;
};

export const getPhotosSortDescending = () =>
  prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });

export const addPhoto = ({
  imagePath,
  eventId,
  photographer,
}: PhotoPutData) => {
  const data: Prisma.PhotoCreateInput = {
    imagePath,
    photographer,
    event: { connect: { id: eventId } },
  };

  return prisma.photo.create({ data });
};

export const getPhotoById = (id: number) =>
  prisma.photo.findUnique({ where: { id } });

export const deletePhoto = async (id: number) => {
  prisma.photo.delete({ where: { id } });
};
