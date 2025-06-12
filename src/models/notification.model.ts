import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
   },
  senderId: { 
   type: mongoose.Schema.Types.ObjectId, 
   ref: 'User' 
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tweet' 
   },
  type: { 
    type: String, enum: ['like', 'reply', 'follow'], 
    required: true 
   },
  isRead: { 
    type: Boolean, 
    default: false  
   }
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
