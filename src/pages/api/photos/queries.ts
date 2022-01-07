/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";

type PhotoPutData = {
  showId: number;
  imagePath: string;
  photographer: string;
};

export const getPhotosSortDescending = () =>
  prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });

export const addPhoto = ({ imagePath, showId, photographer }: PhotoPutData) => {
  const photoData: Prisma.PhotoCreateInput = {
    // remove public directory at the beginning, for link path
    imagePath: imagePath.replace(/^public\//, ""),
    photographer,
  };
  if (showId) photoData.show = { connect: { id: Number(showId) } };

  return prisma.photo.create({ data: photoData });
};

export const getPhotoById = (id: number) =>
  prisma.photo.findUnique({ where: { id } });

export const deletePhoto = async (id: number) => {
  prisma.photo.delete({ where: { id } });
};
