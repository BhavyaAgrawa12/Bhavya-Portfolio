import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { fetchDashboard } from "./dashboard.service.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await fetchDashboard();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard fetched successfully",
      dashboard
    )
  );
});