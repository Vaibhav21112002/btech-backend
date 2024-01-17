import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email : String,
    otp : String,
    date : {
        type : Date,
        default : Date.now
    },
});

const OTP = mongoose.model('OTP', OTPSchema);

export default OTP;