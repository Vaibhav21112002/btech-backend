import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/User.js";
import OTP from "../model/OTP.js";
import {
	SUCCESS,
	ERROR,
	CUSTOM_ERROR_RESPONSE,
} from "../utils/ResponseMessages.js";
import { sendMail } from "../utils/Mail.js";


const sendOTPMail = async (email, otp) => {
	const mailOptions = {
		to: email,
		subject: "OTP for registration for Smart Irrigation System",
		html: `<h1>OTP for registration is ${otp}</h1>`,
	};
	return sendMail(mailOptions);
}

export const register = async (body) => {
	const { name, email, password, otp } = body;
	try {
		if (otp == "" || !otp) {
			return ERROR("OTP is required");
		}
		const checkOTP = await OTP.findOne({ email, otp });
		if (!checkOTP) {
			return ERROR("Invalid OTP");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name,
			email,
			password: hashedPassword,
		});
		await user.save();
		await OTP.findByIdAndDelete(checkOTP._id);
		return SUCCESS("User registered successfully", { user });
	} catch (error) {
		return CUSTOM_ERROR_RESPONSE(500, error.message);
	}
};

export const sendOTP = async (body) => {
	const { name, email, password, confirmPassword } = body;
	try {
		const checkUser = await User.findOne({ email });
		if (checkUser) {
			return ERROR("User already exists");
		}
		if (name == "" || email == "" || password == "" || confirmPassword == "") {
			return ERROR("All fields are required");
		}
		if (password !== confirmPassword) {
			return ERROR("Passwords do not match");
		}

		if (password.length < 6) {
			return ERROR("Password must be at least 6 characters long");
		}

		let otp = Math.floor(100000 + Math.random() * 900000);
		const otpCheck = await OTP.findOne({ email });
		if (otpCheck) {
			otp = otpCheck.otp;
			otpCheck.date = Date.now();
			await otpCheck.save();
			await sendOTPMail(email, otp);
			return SUCCESS("OTP sent successfully", { otp });
		}

		const newOtp = new OTP({
			email,
			otp,
		});
		
		await newOtp.save();
		await sendOTPMail(email, otp);
		return SUCCESS("OTP sent successfully", { otp });
	} catch (error) {
		return CUSTOM_ERROR_RESPONSE(500, error.message);
	}
};

export const login = async (body) => {
	const { email, password } = body;
	try {
		if (email == "" || password == "" || !email || !password) {
			return ERROR("All fields are required");
		}

		const user = await User.findOne({ email });
		if (!user) {
			return ERROR("Invalid email or password");
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return ERROR("Invalid email or password");
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET);
		if (user.apiKey) {
			token = user.apiKey;
		}
		user.apiKey = token;
		await user.save();
		return SUCCESS("Login successful", { token });
	} catch (error) {
		return CUSTOM_ERROR_RESPONSE(500, error.message);
	}
};
