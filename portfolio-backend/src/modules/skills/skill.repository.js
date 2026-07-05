import prisma from "../../lib/prisma.js";

export const createSkill = async (data) => {
    return await prisma.skill.create({
        data,
    });
};

export const getAllSkills = async() => {
    return await prisma.skill.findMany({
        orderBy: {
            displayOrder: "asc",
        },
    });
};

export const getSkillByName = async (name) => {
    return await prisma.skill.findFirst({
        where: {
            name,
        },
    });
};

export const getSkillById = async(id) => {
    return await prisma.skill.findUnique({
        where:{
            id,
        },
    });
};

export const updateSkill = async(id,data) => {
    return await prisma.skill.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteSkill = async (id) => {
    return await prisma.skill.delete({
        where: {
            id,
        },
    });
};

