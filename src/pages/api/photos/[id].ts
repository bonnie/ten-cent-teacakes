import { revalidationRoutes } from "@/lib/api/constants";
import {
  addStandardDelete,
  addStandardGetById,
  addStandardPatch,
  createHandler,
} from "@/lib/api/handler";
import {
  deletePhoto,
  getPhotoById,
  patchPhoto,
} from "@/lib/prisma/queries/photos";

const handler = createHandler(revalidationRoutes.photos);
addStandardDelete({ handler, deleteFunc: deletePhoto });
addStandardGetById({
  handler,
  getByIdFunc: getPhotoById,
});
addStandardPatch({
  handler,
  patchFunc: patchPhoto,
  revalidationRoutes: revalidationRoutes.photos,
});

export default handler;
