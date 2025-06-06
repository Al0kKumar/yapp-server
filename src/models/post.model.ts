import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        maxlength: 280,
        trim: true
    },
    imageUrl: {
        type: String
    },
    likes: [{ // Array of User ObjectIds who liked this post
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    likesCount: { 
        type: Number,
        default: 0
    },
    commentsCount: { // Can be derived, but kept for quick count
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});


const Post = mongoose.model('Post', PostSchema);
export default Post;