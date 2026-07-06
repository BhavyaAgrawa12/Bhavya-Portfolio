import prisma from "../../lib/prisma.js";

export const createContactMessage = async (data) => {
  return await prisma.contactmessage.create({ data });
};

export const getAllContactMessages = async () => {
  return await prisma.contactmessage.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getContactMessageById = async (id) => {
  return await prisma.contactmessage.findUnique({ where: { id } });
};

export const markMessageAsRead = async (id) => {
  return await prisma.contactmessage.update({
    where: { id },
    data: { isRead: true },
  });
};

export const deleteContactMessage = async (id) => {
  return await prisma.contactmessage.delete({ where: { id } });
};

export const getUnreadMessagesCount = async () => {
  return await prisma.contactmessage.count({ where: { isRead: false } });
};
