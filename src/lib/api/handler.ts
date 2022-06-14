import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextConnect, NextHandler } from "next-connect";

import {
  getIdNumFromReq,
  processApiError,
  revalidateRoutes,
} from "@/lib/api/utils";

import {
  ItemAddFunction,
  ItemGetByIdFunction,
  ItemPatchFunction,
} from "../prisma/types";

type Handler = NextConnect<NextApiRequest, NextApiResponse<any>>;

export const createHandler = (revalidationRoutes?: Array<string>) =>
  nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
      Sentry.captureException(error);
      const { status, message } = processApiError(error);
      return res.status(status).json({ message });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    },
  }).use((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const revalidateMethods = ["put", "patch", "delete"];
    if (
      revalidationRoutes &&
      revalidationRoutes.length > 0 &&
      revalidateMethods.includes(req.method?.toLocaleLowerCase() ?? "") &&
      req.query.secret !== process.env.REVALIDATION_SECRET
    ) {
      return res.status(401).json({ message: "Invalid revalidation token" });
    }

    // otherwise, no need to validate revalidation secret
    return next();
  });

export const addStandardPatch = ({
  handler,
  patchFunc,
  revalidationRoutes,
}: {
  handler: Handler;
  patchFunc: ItemPatchFunction;
  revalidationRoutes: Array<string>;
}) => {
  handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = getIdNumFromReq(req);
    const { data } = req.body;
    const patchedItem = await patchFunc({ data, id });

    // TODO: this is clunky
    const routesWithIdReplaced = revalidationRoutes.map((route) =>
      route.replace(/\/:id/, `/${id}`),
    );
    await revalidateRoutes({ revalidationRoutes: routesWithIdReplaced, res });
    return res.status(200).json(patchedItem);
  });
};

export const addStandardDelete = ({
  handler,
  deleteFunc,
  revalidationRoutes = [],
}: {
  handler: Handler;
  deleteFunc: (id: number) => Promise<void>;
  revalidationRoutes?: Array<string>;
}) => {
  handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = getIdNumFromReq(req);
    await deleteFunc(id);
    await revalidateRoutes({ revalidationRoutes, res });
    return res.status(204).end();
  });
};

export const addStandardGetById = ({
  handler,
  getByIdFunc,
}: {
  handler: Handler;
  getByIdFunc: ItemGetByIdFunction;
}) => {
  handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = getIdNumFromReq(req);
    const item = await getByIdFunc(id);
    return res.status(200).json(item);
  });
};

export const addStandardPut = ({
  handler,
  addFunc,
  revalidationRoutes = [],
}: {
  handler: Handler;
  addFunc: ItemAddFunction;
  revalidationRoutes?: Array<string>;
}) => {
  handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    const newItem = await addFunc(req.body.data);
    await revalidateRoutes({ revalidationRoutes, res });
    return res.status(200).json(newItem);
  });
};
