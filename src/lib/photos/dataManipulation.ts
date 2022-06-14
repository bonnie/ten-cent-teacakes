import { getPhotos } from "../prisma/queries/photos";
import { sortPhotos } from ".";

export const getPhotosSortedByDate = async () => {
  const photos = await getPhotos();
  return sortPhotos(photos);
};

export const getNextAndPrevIndexes = async (id: number) => {
  const photos = await getPhotosSortedByDate();
  let prev: number | null = null;
  let next: number | null = null;

  photos.every((photo, index) => {
    if (photo.id === id) {
      next = photos[index + 1] ? photos[index + 1].id : null;
      prev = photos[index - 1] ? photos[index - 1].id : null;
      return false; // this breaks out of the loop
    }
    return true;
  });

  if (!prev && !next) {
    throw new Error(`photo id ${id} not found in photos from db`);
  }

  return { next, prev };
};
