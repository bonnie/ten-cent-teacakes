import { getPhotos } from "../prisma/queries/photos";
import { sortPhotos } from ".";
import { NextAndPrevObject } from "./types";

export const getPhotosSortedByDate = async () => {
  const photos = await getPhotos();

  return sortPhotos(photos);
};

export const getNextAndPrevIndexes = async () => {
  const tempNextAndPrev: NextAndPrevObject = [];
  const photos = await getPhotosSortedByDate();
  photos.forEach((photo, index) => {
    tempNextAndPrev[photo.id] = {
      next: photos[index + 1] ? photos[index + 1].id : null,
      prev: photos[index - 1] ? photos[index - 1].id : null,
    };
  });
  return tempNextAndPrev;
};
