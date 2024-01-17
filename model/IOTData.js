import mongoose from "mongoose";

const IOTDataSchema = new mongoose.Schema({
    userId : String,
    soilMoisture : Number,
    temperature : Number,
    humidity : Number,
    date : {
        type : Date,
        default : Date.now
    },
});

const IOTData = mongoose.model('IOTData', IOTDataSchema);
export default IOTData;