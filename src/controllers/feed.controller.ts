import Post from '../models/post.model';
import Follow from '../models/follower.model';

export const getTimeline = async (req: any, res: any) => {
  try {
    const { userId } = req.params;

    // Find all users the current user is following
    const following = await Follow.find({ followerId: userId }).select('followingId');

    // Extract only IDs
    const followingIds = following.map(f => f.followingId.toString());

    // Include own posts too
    followingIds.push(userId);

    // Fetch posts from followed users + self
    const posts = await Post.find({ userId: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate('userId', 'username name profileImageUrl');

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const getUserPosts = async (req: any, res: any) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId, parentPostId: null })
      .sort({ createdAt: -1 })
      .populate('userId', 'username name profileImageUrl');

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};