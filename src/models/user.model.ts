import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true, 
        minlength: 3 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    profilePic: { 
        type: String,
        default: 'https://default-profile-pic-url.com/avatar.png' // Default avatar
    },
    coverPic: { 
        type: String,
        default: 'https://default-cover-pic-url.com/cover.png' // Default cover
    },
    bio: {
        type: String,
        maxlength: 160 
    },
    followers: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true 
});


const User = mongoose.model('User', UserSchema);
export default User;