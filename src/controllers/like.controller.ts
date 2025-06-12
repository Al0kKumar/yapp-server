import Like from '../models/like.model';
import Post from '../models/post.model';
import Notification from '../models/notification.model';

export const likeTweet = async (req: any, res: any) => {
  try {
    const { userId, postId } = req.body;

    const exists = await Like.findOne({ userId, postId });
    if (exists) return res.status(409).json({ error: 'Already liked' });

    await Like.create({ userId, postId });

    const post = await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } }, { new: true });

    if (post && post.userId.toString() !== userId) {
      await Notification.create({
        recipient: post.userId,
        sender: userId,
        type: 'like',
        postId: post._id
      });
    }

    res.status(201).json({ message: 'Tweet liked' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const unlikeTweet = async (req: any, res: any) => {
  try {
    const { userId, tweetId } = req.body;

    const deleted = await Like.findOneAndDelete({ userId, tweetId });
    if (!deleted) return res.status(404).json({ error: 'Like not found' });

    await Post.findByIdAndUpdate(tweetId, { $inc: { likesCount: -1 } });

    res.json({ message: 'Tweet unliked' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsersWhoLiked = async (req: any, res: any) => {
  try {
    const likes = await Like.find({ tweetId: req.params.tweetId }).populate('userId', 'username name profileImageUrl');
    res.json(likes.map(like => like.userId));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTweetsLikedByUser = async (req: any, res: any) => {
  try {
    const likes = await Like.find({ userId: req.params.userId }).populate('tweetId');
    res.json(likes.map(like => like.postId));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
