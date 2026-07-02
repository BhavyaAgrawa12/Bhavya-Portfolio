import prisma from "../../lib/prisma.js";

export const createMedia = async(data)=>{
    return await prisma.media.create({
        data,
    });
};

export const getAllMedia = async() => {
    return await prisma.media.findMany({
        orderBy:{
            createdAt: "desc",
        },
    });
};

export const getMediaById = async(id) => {
    return await prisma.media.findUnique({
        where: {
            id,
        },
    });
};

export const deleteMedia = async(id) =>{
    return await prisma.media.delete({
        where: {
            id,
        },
    });
};