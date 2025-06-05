import mongoose, { mongo, Schema } from "mongoose";

const PostSchema = new Schema({

    userid: {
        required: true,
        type: String
    },
    content: {
        type: String
    },
    imageurl: {
        type: String
    },
    likes:{
        // ref
    },
    comments:{
        //ref
    },
    likescount: {
        type: Number,
        default: 0
    },
    commentscount: {
        type: Number,
        default: 0
    }
})


const Post = mongoose.model('Post', PostSchema);
export default Post;