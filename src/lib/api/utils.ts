import * as Sentry from "@sentry/nextjs";
import dayjs from "dayjs";
import type { NextApiRequest } from "next";

export const processApiError = (error: unknown) => {
  Sentry.captureException(error);

  let status: number;
  let message: string | undefined;

  if (error instanceof Error) {
    message = error.message;

    if (error.name === "RecordNotFound") {
      status = 404;
    } else {
      status = 500;
    }
  } else {
    message = String(error);
    status = 500;
  }
  return { status, message };
};

export const uniquifyFilename = (filename: string): string => {
  let fileBasename = filename;
  let fileExtension = "";

  const filenameTokens = filename.match(/(.*)\.([^.]*)/);
  if (filenameTokens) {
    [, fileBasename, fileExtension] = filenameTokens;
  }
  return `${fileBasename}-${dayjs().unix()}.${fileExtension}`;
};

export const getIdNumFromReq = (req: NextApiRequest) => {
  const { id: idString } = req.query;
  return Number(idString);
};
