import express from "express";
import {
    uploadDataController,
    getHumidityController,
    getSoilMoistureController,
    getTemperatureController,
} from "../controller/IOTDataController.js";

import { userLogin } from "../middleware/Auth.js";

const router = express.Router();

router.post("/uploadData/:apiKey/:data", uploadDataController);
router.get("/getSoilMoisture", userLogin, getSoilMoistureController);
router.get("/getTemperature", userLogin, getTemperatureController);
router.get("/getHumidity", userLogin, getHumidityController);

export default router;
