import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.js";
import {generateAccessToken} from "../../utils/jwt.js";
import {findAdminByEmail} from "./auth.repository.js";

export const loginAdmin = async ({email, password}) => {
    const admin = await findAdminByEmail(email);

    if(!admin){
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        admin.password
    );

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateAccessToken({
        id: admin.id,
        email: admin.email,
    });
    return {
        token,
        admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
        },
    };
};