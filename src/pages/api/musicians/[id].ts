import { withSentry } from "@sentry/nextjs";

import { revalidationRoutes } from "@/lib/api/constants";
import {
  addStandardDelete,
  addStandardPatch,
  createHandler,
} from "@/lib/api/handler";
import { deleteMusician, patchMusician } from "@/lib/prisma/queries/musicians";

const handler = createHandler(revalidationRoutes.musicians);

addStandardDelete({
  handler,
  deleteFunc: deleteMusician,
  revalidationRoutes: revalidationRoutes.musicians,
});
addStandardPatch({
  handler,
  patchFunc: patchMusician,
  revalidationRoutes: revalidationRoutes.musicians,
});

export default withSentry(handler);
