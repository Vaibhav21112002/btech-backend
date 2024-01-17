import { getUsers } from "../service/UserService.js";

export const getUsersController = async (req, res) => {
    const response = await getUsers(req, res);
    return res.status(response.status).json(response);
}