import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({

    userId:{
        required: true,
        type: String
    },
    postId:{
        required: true,
        type: String
    },
    content: {
        type: String
    },
    imageUrl: {
        type: String
    },
    likesCount:{
        type: Number,
        default: 0
    },
    replyCount: {
        type: Number,
        default: 0
    },
})

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;