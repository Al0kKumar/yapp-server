import Notification from '../models/notification.model'

export const createNotification = async (req: any, res: any) => {
  try {
    const { recipient, sender, type, postId } = req.body;

    if (recipient === sender) return res.status(400).json({ error: "Can't notify yourself" });

    const notif = new Notification({ recipient, sender, type, postId });
    await notif.save();

    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getNotificationsForUser = async (req: any, res: any) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('sender', 'username profileImageUrl')
      .populate('postId', 'content');

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const markAsRead = async (req: any, res: any) => {
  try {
    await Notification.findByIdAndUpdate(req.params.notifId, { isRead: true });
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const markAllAsRead = async (req: any, res: any) => {
  try {
    await Notification.updateMany({ recipient: req.params.userId }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
