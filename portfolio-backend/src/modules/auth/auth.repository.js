import prisma from "../../lib/prisma.js";

export const findAdminByEmail = async (email) => {
    return await prisma.admin.findUnique({
        where:{
            email,
        },
    });
};

export const findAdminById = async(id)=>{
    return await prisma.admin.findUnique({
        where:{
            id,
        },
    });
};

export const createAdmin = async (data) => {
    return await prisma.admin.create({
        data,
    });
};