import { revalidationRoutes } from "@/lib/api/constants";
import {
  addStandardDelete,
  addStandardGetById,
  addStandardPatch,
  createHandler,
} from "@/lib/api/handler";
import {
  deleteVenue,
  getVenueById,
  patchVenue,
} from "@/lib/prisma/queries/venues";

const handler = createHandler(revalidationRoutes.venues);
addStandardDelete({
  handler,
  deleteFunc: deleteVenue,
  revalidationRoutes: revalidationRoutes.venues,
});

addStandardGetById({
  handler,
  getByIdFunc: getVenueById,
});

addStandardPatch({
  handler,
  patchFunc: patchVenue,
  revalidationRoutes: revalidationRoutes.venues,
});

export default handler;
