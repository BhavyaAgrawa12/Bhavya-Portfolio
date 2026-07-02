import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import {env} from "../config/env.js";

const authenticate = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized"});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const admin = await prisma.admin.findUnique({
            where: {id: decoded.id},
        });

        if(!admin){
            return res.status(401).json({message: "Unauthorized"});
        }
        req.admin = admin;
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message: "Unauthorized",
        });
    }
};

export default authenticate;