import Follow from '../models/follower.model';
import User from '../models/user.model';
import Notification from "../models/notification.model"


export const followUser = async (req: any, res: any) => {
  try {
    const { followerId, followingId } = req.body;

    if (followerId === followingId) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    const exists = await Follow.findOne({ followerId, followingId });
    if (exists) return res.status(409).json({ error: 'Already following' });

    await Follow.create({ followerId, followingId });

    // ✅ Trigger follow notification
    await Notification.create({
      recipient: followingId,
      sender: followerId,
      type: 'follow'
    });

    res.status(201).json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const unfollowUser = async (req: any, res: any) => {
  try {
    const { followerId, followingId } = req.body;

    const result = await Follow.findOneAndDelete({ followerId, followingId });
    if (!result) return res.status(404).json({ error: 'Not following' });

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFollowers = async (req: any, res: any) => {
  try {
    const followers = await Follow.find({ followingId: req.params.userId })
      .populate('followerId', 'username name profileImageUrl');

    res.json(followers.map(f => f.followerId));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFollowing = async (req: any, res: any) => {
  try {
    const following = await Follow.find({ followerId: req.params.userId })
      .populate('followingId', 'username name profileImageUrl');

    res.json(following.map(f => f.followingId));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
