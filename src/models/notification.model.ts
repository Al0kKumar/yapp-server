import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema({
    // The user who receives the notification
    recipientId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    // The user who triggered the notification (e.g., liked a post, followed)
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        required: true,
        enum: ['like', 'comment', 'follow', 'repost'] // Define possible types
    },
    // Optional: reference to the Post if the notification is related to a post (like, comment, repost)
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    // Optional: reference to the Comment if the notification is related to a comment (like, reply to comment)
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});


const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;