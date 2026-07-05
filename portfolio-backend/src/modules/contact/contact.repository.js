import prisma from "../../lib/prisma.js";

export const createContactMessage = async (data) => {
  return await prisma.contactMessage.create({
    data,
  });
};

export const getAllContactMessages = async () => {
  return await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getContactMessageById = async (id) => {
  return await prisma.contactMessage.findUnique({
    where: {
      id,
    },
  });
};

export const markMessageAsRead = async (id) => {
  return await prisma.contactMessage.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
};

export const deleteContactMessage = async (id) => {
  return await prisma.contactMessage.delete({
    where: {
      id,
    },
  });
};

export const getUnreadMessagesCount = async () => {
  return await prisma.contactMessage.count({
    where: {
      isRead: false,
    },
  });
};