import ApiError from "../../utils/ApiError.js";

import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  markMessageAsRead,
  deleteContactMessage,
  getUnreadMessagesCount,
} from "./contact.repository.js";

/* ---------------- Public ---------------- */

export const submitContactMessage = async (data) => {
  return await createContactMessage(data);
};

/* ---------------- Admin ---------------- */

export const fetchAllMessages = async () => {
  return await getAllContactMessages();
};

export const fetchMessageById = async (id) => {
  return await getContactMessageById(id);
};

export const readMessage = async (id) => {
  const message = await getContactMessageById(id);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  return await markMessageAsRead(id);
};

export const removeMessage = async (id) => {
  const message = await getContactMessageById(id);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  return await deleteContactMessage(id);
};

export const fetchUnreadMessagesCount = async () => {
  return await getUnreadMessagesCount();
};