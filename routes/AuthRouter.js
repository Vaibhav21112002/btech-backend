import express from "express";
import { registerController, sendOTPController, loginController } from "../controller/AuthController.js";

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/sendOTP', sendOTPController);

export default router;