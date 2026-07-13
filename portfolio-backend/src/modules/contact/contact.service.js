import ApiError from "../../utils/ApiError.js";
import { sendContactNotificationEmail } from "../../utils/mail.js";

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
  const message = await createContactMessage(data);
  // Send email in the background so we do not block client response
  sendContactNotificationEmail(message).catch((err) => {
    console.error("Failed to send contact notification email:", err.message);
  });
  return message;
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