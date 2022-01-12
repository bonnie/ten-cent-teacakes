/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import {
  PhotoPatchArgs,
  PhotoPatchData,
  PhotoPutData,
  PhotoWithShowAndVenue,
} from "@/lib/photos/types";
import prisma from "@/lib/prisma";
import { removePublicDir } from "@/lib/queries";

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

const transformData = (data: PhotoPatchData) => ({
  photographer: data.photographer,
  takenAt: data.takenAt ? new Date(data.takenAt) : undefined,
  description: data.description,
  show:
    data.showId || data.showId === 0
      ? { connect: { id: Number(data.showId) } }
      : undefined,
});

export const addPhoto = ({
  imagePath,
  showId,
  photographer,
  takenAt,
  description,
}: PhotoPutData) => {
  const metadata = transformData({
    showId,
    photographer,
    takenAt,
    description,
  });
  const photoData: Prisma.PhotoCreateInput = {
    // remove public directory at the beginning, for link path
    // but leave the forward slash after so the path starts with `/`
    imagePath: removePublicDir(imagePath),
    ...metadata,
  };
  return prisma.photo.create({ data: photoData });
};

export const patchPhoto = async ({ data, id }: PhotoPatchArgs) => {
  const photoData = getPhotoById(id);
  if (!photoData) {
    throw new Error(`Bad photo id: ${id}`);
  }
  const patchData = transformData(data);

  await prisma.photo.update({ data: patchData, where: { id } });
};

export const getPhotoById = async (
  id: number,
): Promise<PhotoWithShowAndVenue> => {
  const photo = await prisma.photo.findUnique({
    where: { id },
    include: { show: true },
  });
  if (!photo?.id) throw new Error("No photo found");
  const photoWithVenue: PhotoWithShowAndVenue = {
    ...photo,
    showVenue: undefined,
  };
  if (photo?.show) {
    const showVenue = await getVenueById(photo.show.venueId);
    photoWithVenue.showVenue = showVenue ?? undefined;
  }
  return photoWithVenue;
};

export const deletePhoto = async (id: number) => {
  await prisma.photo.delete({ where: { id } });
};
