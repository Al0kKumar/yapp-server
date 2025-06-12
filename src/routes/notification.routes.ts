import express from 'express';
import { createNotification, getNotificationsForUser,markAsRead, markAllAsRead } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/notifications', createNotification);
router.get('/notifications/:userId', getNotificationsForUser);
router.patch('/notifications/:notifId/read', markAsRead);
router.patch('/notifications/mark-all-read/:userId', markAllAsRead);

export default router;
