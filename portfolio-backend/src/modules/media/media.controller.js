import fs from "fs";
import path from "path"

import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { uploadMedia,fetchAllMedia,removeMedia, fetchMediaById } from "./media.service.js";

export const upload = asyncHandler(async(req, res)=>{
    if(!req.file){
        throw new ApiError(400,"No file uploaded");
    }
    const media = await uploadMedia(req.file);
    return res.status(201).json(
        new ApiResponse(
            201,"File uploaded Success",media
        )
    );
});

export const getAll = asyncHandler(async(req,res)=>{
    const media = await fetchAllMedia();
        return res.status(200).json(
            new ApiResponse(
                200,"Media fetch success",media
           )
        );
});

export const remove = asyncHandler(async(req,res)=>{
    const media = await fetchMediaById(req.params.id);

    if(!media){
        throw new ApiError (404,"Media not found");
    }

    const filePath = path.join(
        process.cwd(),
        media.fileUrl.replace("/","")
    );

    if (fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
    }
    await removeMedia(media.id);
    return res.status(200).json(
        new ApiResponse(
            200,"Media Deleted Successfully"
        )
    );
});


export const getOne = asyncHandler(async (req, res) => {
    const media = await fetchMediaById(req.params.id);

    if (!media) {
        throw new ApiError(404, "Media not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Media fetched successfully",
            media
        )
    );
});
