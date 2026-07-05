import prisma from "../../lib/prisma.js";

export const getPortfolio = async() => {
    let portfolio = await prisma.portfolio.findUnique({
        where:{
            id: 1,
        },
        include: {
            profileImage: true,
            workspaceImage: true,
            resume: true,
        },
    });

    if (!portfolio){
        portfolio = await prisma.portfolio.create({
            data: {
                id: 1,
            },
            include: {
                profileImage: true,
                workspaceImage: true,
                resume: true,
            },
        });
    }
    return portfolio;
};


export const updatePortfolio = async (data) => {
    return prisma.portfolio.update({
        where: {
            id: 1,
        },
        data,
        include: {
            profileImage: true,
            workspaceImage: true,
            resume: true
        },
    });
};
