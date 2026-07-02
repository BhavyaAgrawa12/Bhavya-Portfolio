import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try{
        const existingAdmin = await prisma.admin.findFirst();

        if(existingAdmin){
            console.log("Admin already exists");
            return;
        }
        const hashedPassword = await bcrypt.hash("Bhumika@12",10);
        const admin = await prisma.admin.create({
            data: {
                username: "Bhavya",
                email: "agrawalbhavya563@gmail.com",
                password: hashedPassword,
            },
        });
        console.log("Admin created successfully!");
        console.log({
            username:admin.username,
            email:admin.email,
        });
    }catch(error){
        console.error("Error seeding admin",error);
    }finally{
        await prisma.$disconnect();
    }
}

main();