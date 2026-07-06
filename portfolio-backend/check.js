import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const admin = await prisma.admin.findFirst();
console.log("Admin in DB:", admin ? { id: admin.id, email: admin.email } : "NOT FOUND");

if (admin) {
  const match = await bcrypt.compare(process.env.ADMIN_PASSWORD, admin.password);
  console.log("Password match for", process.env.ADMIN_PASSWORD, ":", match);
}
await prisma.$disconnect();
