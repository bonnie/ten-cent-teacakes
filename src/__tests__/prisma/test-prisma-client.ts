import { PrismaClient } from "@prisma/client";

import { createEnhancedPrismaClient } from "./prisma-utils";

const EnhancedPrisma = createEnhancedPrismaClient(PrismaClient);

export * from "@prisma/client";
export default new EnhancedPrisma();
