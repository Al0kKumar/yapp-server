import User from "../models/user.model"

export const searchUsers = async (req: any, res: any) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string' || q.trim() === '') {
      return res.status(400).json({ error: 'Invalid query' });
    }

    const regex = new RegExp(q, 'i'); // case-insensitive

    const users = await User.find({
      $or: [
        { username: regex },
        { name: regex }
      ]
    }).select('username name profileImageUrl');

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};