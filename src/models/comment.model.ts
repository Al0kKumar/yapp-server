import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId, // Reference to the User who made the comment
        ref: 'User',
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId, // Reference to the Post the comment belongs to
        ref: 'Post',
        required: true,
    },
    parentCommentId: { // For replies: stores the _id of the parent comment
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null, // Null if it's a top-level comment
    },
    content: {
        type: String,
        maxlength: 280, 
        trim: true
    },
    imageUrl: { 
        type: String
    },
    likes: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    replyCount: { 
        type: Number,
        default: 0
    }
}, {
    timestamps: true 
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;