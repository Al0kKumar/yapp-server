import mongoose, { mongo, Schema } from "mongoose";

const PostSchema = new Schema({

    userId: {
        required: true,
        type: String
    },
    content: {
        type: String
    },
    imageUrl: {
        type: String
    },
    likes:{
        // ref
    },
    comments:{
        //ref
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
})


const Post = mongoose.model('Post', PostSchema);
export default Post;