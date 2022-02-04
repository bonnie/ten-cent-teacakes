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

const getFilenameParts = (
  filename: string,
): { fileBasename?: string; fileExtension?: string } => {
  const tokens = filename.match(/(.*)\.([^.]*)/);
  if (tokens) {
    const [, fileBasename, fileExtension] = tokens;
    return { fileBasename, fileExtension };
  }
  return { fileBasename: filename, fileExtension: "" };
};

export const uniquifyFilename = (
  filename: string,
): { uniqueFileName: string; uniqueThumbnailFileName: string } => {
  const { fileBasename, fileExtension } = getFilenameParts(filename);
  const uniqueFileBasename = `${fileBasename}-${dayjs().unix()}`;
  const uniqueFileName = `${uniqueFileBasename}.${fileExtension}`;

  return {
    uniqueFileName,
    uniqueThumbnailFileName: getThumbName(uniqueFileName),
  };
};

export const getIdNumFromReq = (req: NextApiRequest) => {
  const { id: idString } = req.query;
  return Number(idString);
};

export const getThumbName = (filename: string): string => {
  const { fileBasename, fileExtension } = getFilenameParts(filename);
  return `${fileBasename}-thumb.${fileExtension}`;
};
