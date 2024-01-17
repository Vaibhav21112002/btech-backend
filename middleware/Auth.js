import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

import { UNAUTHORIZED } from "../utils/ResponseMessages.js";

export const userLogin = async (req, res, next) => {
    try {
        let token = req.header("auth-token");
        if(!token) return UNAUTHORIZED();
        

        token = token.replace("Bearer ", "");
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return UNAUTHORIZED();
    }
}
