import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

type PrismaClientInstance = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

/**
 * @type PrismaClient
 */
let prisma: PrismaClientInstance;

declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/naming-convention
  var __db: PrismaClientInstance;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  // In development we validate that only a single db is created (because of Remix reloads)
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }

  prisma = global.__db;
}

export { prisma };
