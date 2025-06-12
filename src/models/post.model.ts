import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
   },
  content: { 
    type: String, 
    maxlength: 280 ,
    trim: true
   },
  parentPostId: {  
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post' 
   }, 
  likesCount: { 
    type: Number, 
    default: 0 
   },
  repliesCount: { 
    type: Number, 
    default: 0 
   },
  media: [{
    url: String,
    type: { type: String, default: 'image' } 
  }]
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
