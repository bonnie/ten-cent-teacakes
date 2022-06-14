import dayjs from "dayjs";

import { getPhotos } from "../prisma/queries/photos";
import { getPhotoDate } from ".";
import { NextAndPrevObject } from "./types";

export const getPhotosSortedByDate = async () => {
  const photos = await getPhotos();

  return photos.sort((a, b) => {
    const photoDateA = dayjs(getPhotoDate(a)).unix();
    const photoDateB = dayjs(getPhotoDate(b)).unix();
    if (photoDateA === photoDateB) {
      // Filename is only important when dates are the same
      return a.imagePath.localeCompare(b.imagePath);
    }
    return photoDateA < photoDateB ? 1 : -1;
  });
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
