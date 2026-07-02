import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {loginAdmin} from "./auth.service.js";

export const login = asyncHandler(async(req,res)=>{
    const result = await loginAdmin(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login Successful",
            result
        )
    );
});

export const me = asyncHandler(async(req,res)=>{
    return res.status(200).json(
        new ApiResponse(
            200,
            "Authenticated User",
            req.admin
        )
    );
});


export const logout = asyncHandler(async(req,res)=>{
    return res.status(200).json(
        new ApiResponse(
            200,
            "Logout Successful",
        )
    );
});