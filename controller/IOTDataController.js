import {
    uploadData,
    getHumidity,
    getSoilMoisture,
    getTemperature,
} from "../service/IOTDataService.js";

export const uploadDataController = async (req, res) => {
    const result = await uploadData(req.params.data, req.params.apiKey);
    res.status(result.status).json(result);
};

export const getSoilMoistureController = async (req, res) => {
    const result = await getSoilMoisture(req.user.id);
    res.status(result.status).json(result);
};

export const getTemperatureController = async (req, res) => {
    const result = await getTemperature(req.user.id);
    res.status(result.status).json(result);
};

export const getHumidityController = async (req, res) => {
    const result = await getHumidity(req.user.id);
    res.status(result.status).json(result);
};
