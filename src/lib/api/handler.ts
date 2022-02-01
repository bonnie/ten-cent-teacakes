import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextConnect } from "next-connect";

import { getIdNumFromReq, processApiError } from "@/lib/api/utils";

// import { DbItem, ItemPatchArgs } from "../prisma/types";

type Handler = NextConnect<NextApiRequest, NextApiResponse<any>>;

export const createHandler = () =>
  nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
      Sentry.captureException(error);
      const { status, message } = processApiError(error);
      res.status(status).json({ message });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    },
  });

// TODO: get this properly typed
// export const addStandardPatch = ({
//   handler,
//   patchFunc,
// }: {
//   handler: Handler;
//   patchFunc: (args: ItemPatchArgs) => Promise<DbItem>;
// }) => {
//   handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
//     res
//       .status(201)
//       .json(await patchFunc({ data: req.body.data, id: getIdNumFromReq(req) }));
//   });
// };

export const addStandardDelete = ({
  handler,
  deleteFunc,
}: {
  handler: Handler;
  deleteFunc: (id: number) => Promise<void>;
}) => {
  handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = getIdNumFromReq(req);
    await deleteFunc(id);
    res.status(204).end();
  });
};

// TODO: get this properly typed
// export const addStandardGetById = ({
//   handler,
//   getByIdFunc,
// }: {
//   handler: Handler;
//   getByIdFunc: (id: number) => Promise<DbItem>;
// }) => {
//   handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
//     const id = getIdNumFromReq(req);
//     const item = await getByIdFunc(id);
//     return res.status(200).json(item);
//   });
// };
