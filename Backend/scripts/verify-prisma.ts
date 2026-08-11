import { prisma } from "../lib/prisma";

try {
  await prisma.settings.findFirst({ select: { id: true } });
  console.log("✅ Connected");
} finally {
  await prisma.$disconnect();
}
