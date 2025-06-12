import User from '../models/user.model.js';

export const getUserProfile = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-__v');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUserProfile = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, bio, profileImageUrl, coverImageUrl } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { name, bio, profileImageUrl, coverImageUrl },
      { new: true }
    ).select('-__v');

    if (!updated) return res.status(404).json({ error: 'User not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
