import mongoose from "mongoose";

import { SUCCESS, ERROR, CUSTOM_ERROR_RESPONSE } from "../utils/ResponseMessages.js";
import User from "../model/User.js";

export const getUsers = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id).select("-password");
        if(!user) return ERROR("User not found");

        return SUCCESS("User fetched successfully", { user });
    } catch (error) {
        return CUSTOM_ERROR_RESPONSE(500, error.message);
    }
}

