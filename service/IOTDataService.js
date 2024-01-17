import User from "../model/User.js";
import IOTData from "../model/IOTData.js";
import jwt from "jsonwebtoken";

import {
    SUCCESS,
    ERROR,
    CUSTOM_ERROR_RESPONSE,
} from "../utils/ResponseMessages.js";

export const uploadData = async (data, apiKey) => {
    try {
        if(!data || !apiKey) return ERROR("Invalid data or api key");
        // soilMoisture=23&temperature=234&humidity=34
        const dataArr = data.split("&");
        const soilMoisture = dataArr[0]?.split("=")[1];
        const temperature = dataArr[1]?.split("=")[1] == "nan" ? 0 : dataArr[1]?.split("=")[1];
        const humidity = dataArr[2]?.split("=")[1] == "nan" ? 0 : dataArr[2]?.split("=")[1];
        const token = apiKey;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.user.id;
        const iotData = new IOTData({
            userId: id,
            soilMoisture,
            temperature,
            humidity,
        });

        await iotData.save();
        return SUCCESS("Data uploaded successfully", { iotData });
    } catch (error) {
        return CUSTOM_ERROR_RESPONSE(500, error.message);
    }
};

export const getSoilMoisture = async (id) => {
    try {
        const iotData = await IOTData.find({ userId: id })
            .sort({ date: -1 })
            .select("soilMoisture")
            .select("date");
        const user = await User.findById(id);
        if(iotData[0].soilMoisture > 900){
            user.waterNeeded = true;
        }else{
            user.waterNeeded = false;
        }

        await user.save();
        return SUCCESS("Data fetched successfully", { iotData });
    } catch (error) {
        return CUSTOM_ERROR_RESPONSE(500, error.message);
    }
};

export const getTemperature = async (id) => {
    try {
        const iotData = await IOTData.find({ userId: id })
            .sort({ date: -1 })
            .select("temperature")
            .select("date");
        return SUCCESS("Data fetched successfully", { iotData });
    } catch (error) {
        return CUSTOM_ERROR_RESPONSE(500, error.message);
    }
};

export const getHumidity = async (id) => {
    try {
        const iotData = await IOTData.find({ userId: id })
            .sort({ date: -1 })
            .select("humidity")
            .select("date");
        return SUCCESS("Data fetched successfully", { iotData });
    } catch (error) {
        return CUSTOM_ERROR_RESPONSE(500, error.message);
    }
};
