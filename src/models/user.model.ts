import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({

    username: {
        required: true,
        type: String
    },
    userid: {
        required: true,
        unique: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    profilepic: {
        type: String
    } ,
    coverpic: {
        type: String
    },
    bio: {
        type: String
    }
})


const User = mongoose.model('User', UserSchema);
export default User;