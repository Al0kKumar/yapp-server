import Post from '../models/post.model';
import User from '../models/user.model';
import mongoose from 'mongoose';

export const createPost = async (req: any, res: any) => {
  try {
    const { userId, content, media, parentPostId } = req.body;

    const post = new Post({
      userId,
      content,
      media,
      parentPostId: parentPostId || null
    });

    await post.save();

    // If it's a reply, increment repliesCount on parent
    if (parentPostId) {
      await Post.findByIdAndUpdate(parentPostId, {
        $inc: { repliesCount: 1 }
      });
    }

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tweet' });
  }
};

export const getPostById = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'username name profileImageUrl');
    if (!post) return res.status(404).json({ error: 'Tweet not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePost = async (req: any, res: any) => {
  try {
    const { id } = req.params;          // post id
    const { userId } = req.body;        // current user id

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserPosts = async (req: any, res: any) => {
  try {
    const posts = await Post.find({ userId: req.params.uid }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeedPosts = async (req: any, res: any) => {
  try {
    const userId = req.params.uid;

    // Get all followings of user
    const followings = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'followers',
          localField: '_id',
          foreignField: 'followerId',
          as: 'followingList'
        }
      },
      {
        $project: {
          followingIds: '$followingList.followingId'
        }
      }
    ]);

    const ids = [userId, ...(followings[0]?.followingIds || [])];

    const posts = await Post.find({ userId: { $in: ids } })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


