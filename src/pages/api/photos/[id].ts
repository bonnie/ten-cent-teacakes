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
  // TODO: this should redo all photo IDs, since order might change if date changes
  // https://github.com/vercel/next.js/discussions/34585
  revalidationRoutes: [...revalidationRoutes.photos, "/photos/:id"],
});

export default handler;
