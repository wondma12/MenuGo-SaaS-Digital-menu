import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Prisma resolves DATABASE_URL while this client is created, so the local .env
// must be loaded before constructing PrismaClient.
dotenv.config({ override: true });

const prisma = new PrismaClient();

export default prisma;
