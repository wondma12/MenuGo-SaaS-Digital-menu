import { prisma } from "../lib/prisma";
import { hashPassword } from "../src/utils/password.js";

async function main() {
  await prisma.settings.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      platform_name: "MenuGo",
      support_email: "support@menugo.local",
      contact_phone: "+0000000000",
    },
  });

  const adminPassword = await hashPassword("Hay1221#");

  await prisma.users.upsert({
    where: { email: "haymanotwondmagegn3@gmail.com" },
    update: {
      name: "Haymanot Wondmagegn",
      password: adminPassword,
      role: "platform_admin",
      is_active: true,
      is_email_verified: true,
    },
    create: {
      name: "Haymanot Wondmagegn",
      email: "haymanotwondmagegn3@gmail.com",
      password: adminPassword,
      role: "platform_admin",
      is_active: true,
      is_email_verified: true,
    },
  });
}

main().then(() => prisma.$disconnect()).catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
