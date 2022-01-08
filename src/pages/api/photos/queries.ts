/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import {
  PhotoPatchArgs,
  PhotoPutData,
  PhotoWithShowAndVenue,
} from "@/lib/photos/types";
import prisma from "@/lib/prisma";

import { getVenueById } from "../venues/queries";

export const getPhotos = async () => {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
    include: { show: true },
  });
  const photosWithVenue: Array<PhotoWithShowAndVenue> = [];
  await Promise.all(
    photos.map(async (photo) => {
      if (photo.show) {
        const photoWithVenue: PhotoWithShowAndVenue = photo;
        const showVenue = await getVenueById(photo.show.venueId);
        photoWithVenue.showVenue = showVenue ?? undefined;
        photosWithVenue.push(photoWithVenue);
      } else {
        photosWithVenue.push(photo);
      }
    }),
  );
  return photosWithVenue;
};

export const addPhoto = ({ imagePath, showId, photographer }: PhotoPutData) => {
  const photoData: Prisma.PhotoCreateInput = {
    // remove public directory at the beginning, for link path
    imagePath: imagePath.replace(/^public\//, ""),
    photographer,
  };
  if (showId) photoData.show = { connect: { id: Number(showId) } };

  return prisma.photo.create({ data: photoData });
};

export const patchPhoto = async ({ data, id }: PhotoPatchArgs) => {
  const photoData = getPhotoById(id);
  if (!photoData) {
    throw new Error(`Bad photo id: ${id}`);
  }
  const patchData = {
    photographer: data.photographer,
    show:
      data.showId || data.showId === 0
        ? { connect: { id: Number(data.showId) } }
        : undefined,
  };

  await prisma.photo.update({ data: patchData, where: { id } });
};

export const getPhotoById = (id: number) =>
  prisma.photo.findUnique({ where: { id } });

export const deletePhoto = async (id: number) => {
  await prisma.photo.delete({ where: { id } });
};
