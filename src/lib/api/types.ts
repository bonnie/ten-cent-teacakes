import { Express } from "express";
import type { NextApiRequest } from "next";

export type NextApiRequestWithFile = NextApiRequest & {
  file: Express.Multer.File;
};
