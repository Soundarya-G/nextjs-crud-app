// Prisma client api is used to talk to database from rest api
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global
// make single ton prisma client
export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['query'] })
