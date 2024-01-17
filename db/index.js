import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connnect = (async) => {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => {
			console.log("Database connected");
		})
		.catch((err) => {
			console.log("Database connection failed");
		});
};

export default connnect;