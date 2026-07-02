
import prisma from "./config/prisma.js";

async function test() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();