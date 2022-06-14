import { revalidationRoutes } from "@/lib/api/constants";
import {
  addStandardDelete,
  addStandardPatch,
  createHandler,
} from "@/lib/api/handler";
import { deleteShow, patchShow } from "@/lib/prisma/queries/shows";

const handler = createHandler(revalidationRoutes.shows);
addStandardDelete({
  handler,
  deleteFunc: deleteShow,
  revalidationRoutes: ["/shows"],
});

addStandardPatch({
  handler,
  patchFunc: patchShow,
  revalidationRoutes: revalidationRoutes.shows,
});

export default handler;
