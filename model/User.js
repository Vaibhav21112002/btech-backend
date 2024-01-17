import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    apiKey : String, // non expirable
    date : {
        type : Date,
        default : Date.now
    },
    waterNeeded: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);
export default User;