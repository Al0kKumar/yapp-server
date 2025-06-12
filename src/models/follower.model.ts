import mongoose from 'mongoose';

const followerSchema = new mongoose.Schema({
  followerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
   },
  followingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
   }
}, { timestamps: true });

followerSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

export default mongoose.model('Follower', followerSchema);
