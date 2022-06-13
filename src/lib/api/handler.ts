import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextConnect } from "next-connect";

import apiUtils from "@/lib/api/utils";

// import { DbItem, ItemPatchArgs } from "../prisma/types";

type Handler = NextConnect<NextApiRequest, NextApiResponse<any>>;

export const createHandler = () =>
  nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
      Sentry.captureException(error);
      const { status, message } = apiUtils.processApiError(error);
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
  revalidateRoutes = [],
}: {
  handler: Handler;
  deleteFunc: (id: number) => Promise<void>;
  revalidateRoutes?: Array<string>;
}) => {
  handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    if (revalidateRoutes.length > 0) {
      apiUtils.checkValidationSecret(req, res);
    }
    const id = apiUtils.getIdNumFromReq(req);
    await deleteFunc(id);

    Promise.all(
      revalidateRoutes.map((route) => res.unstable_revalidate(route)),
    );
    return res.status(204).end();
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
