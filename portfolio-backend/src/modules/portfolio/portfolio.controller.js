import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { fetchPortfolio, editPortfolio } from "./portfolio.service.js";

export const getPortfolio = asyncHandler(async(req, res)=>{
    const portfolio = await fetchPortfolio();
    console.log("[Portfolio API] Resume URL from DB:", portfolio?.resume?.fileUrl);
    return res.status(200).json(
        new ApiResponse(200,"Portfolio fetched successfully",portfolio)
    );
});

export const updatePortfolio = asyncHandler(async(req,res)=>{
    // Whitelist only the fields Prisma accepts on the Portfolio model.
    // Passing unknown keys directly to prisma.update() throws a runtime error.
    const ALLOWED = [
        "heroTitle","heroSubtitle","heroDescription",
        "aboutTitle","aboutDescription",
        "resumeId","github","linkedin","x","instagram",
        "email","phone","address","footerText",
        "metaTitle","metaDescription","keywords",
        "profileImageId","workspaceImageId",
    ];

    const data = Object.fromEntries(
        Object.entries(req.body).filter(([key]) => ALLOWED.includes(key))
    );

    const portfolio = await editPortfolio(data);
    return res.status(200).json(
        new ApiResponse(200,"Portfolio updated successfully",portfolio)
    );
});