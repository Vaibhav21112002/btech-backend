import { sendOTP, register, login } from '../service/AuthService.js';

export const registerController = async (req, res) => {
    const result = await register(req.body);
    res.status(result.status).json(result);
}

export const sendOTPController = async (req, res) => {
    const result = await sendOTP(req.body);
    res.status(result.status).json(result);
}

export const loginController = async (req, res) => {
    const result = await login(req.body);
    res.status(result.status).json(result);
}