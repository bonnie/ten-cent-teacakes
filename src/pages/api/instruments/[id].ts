import { revalidationRoutes } from "@/lib/api/constants";
import {
  addStandardDelete,
  addStandardPatch,
  createHandler,
} from "@/lib/api/handler";
import {
  deleteInstrument,
  patchInstrument,
} from "@/lib/prisma/queries/instruments";

const handler = createHandler(revalidationRoutes.instruments);
addStandardDelete({
  handler,
  deleteFunc: deleteInstrument,
  revalidationRoutes: revalidationRoutes.instruments,
});
addStandardPatch({
  handler,
  patchFunc: patchInstrument,
  revalidationRoutes: revalidationRoutes.instruments,
});

export default handler;
