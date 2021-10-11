/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */

// reference: https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

// eslint-disable-next-line import/no-mutable-exports
let prismaClient: PrismaClient;
const prismaClientOptions = {
  rejectOnNotFound: true,
};

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient(prismaClientOptions);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(prismaClientOptions);
  }
  prismaClient = global.prisma;
}
export default prismaClient;
