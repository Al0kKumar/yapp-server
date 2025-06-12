import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { 
    type: String, required: true, unique: true, maxlength: 15 
    },
  email: { 
    type: String, required: true, unique: true 
    },
  password: { 
    type: String, 
    required: true
    },
  name: { 
    type: String 
    },
  bio: { 
    type: String 
    },
  profileImageUrl: {
     type: String 
    },
  bannerImageUrl: {
     type: String 
    },
  followersCount: {
     type: Number,
     default: 0 
    },
  followingCount: { 
    type: Number, 
    default: 0 
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
