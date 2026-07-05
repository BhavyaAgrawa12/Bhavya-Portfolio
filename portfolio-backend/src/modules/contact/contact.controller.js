import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

import {
  submitContactMessage,
  fetchAllMessages,
  fetchMessageById,
  readMessage,
  removeMessage,
  fetchUnreadMessagesCount,
} from "./contact.service.js";

/* ---------------- Public ---------------- */

export const create = asyncHandler(async (req, res) => {
  const message = await submitContactMessage(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Message sent successfully",
      message
    )
  );
});

/* ---------------- Admin ---------------- */

export const getAll = asyncHandler(async (req, res) => {
  const messages = await fetchAllMessages();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Messages fetched successfully",
      messages
    )
  );
});

export const getById = asyncHandler(async (req, res) => {
  const message = await fetchMessageById(req.params.id);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Message fetched successfully",
      message
    )
  );
});

export const markAsRead = asyncHandler(async (req, res) => {
  const message = await readMessage(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Message marked as read",
      message
    )
  );
});

export const remove = asyncHandler(async (req, res) => {
  await removeMessage(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Message deleted successfully"
    )
  );
});

export const unreadCount = asyncHandler(async (req, res) => {
  const count = await fetchUnreadMessagesCount();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Unread messages count fetched successfully",
      { count }
    )
  );
});