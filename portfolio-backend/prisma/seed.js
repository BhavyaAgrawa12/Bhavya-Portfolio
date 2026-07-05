import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.admin.findFirst();

  if (existingAdmin) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("Bhumika@12", 10);

  const admin = await prisma.admin.create({
    data: {
      username: "Bhavya",
      email: "agrawalbhavya563@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin created successfully");
  console.table({
    Username: admin.username,
    Email: admin.email,
  });
}

main()
  .catch((error) => {
    console.error("❌ Error while seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });