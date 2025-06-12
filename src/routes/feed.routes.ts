import express from 'express';
import { getTimeline, getUserPosts } from '../controllers/feed.controller';

const router = express.Router();

router.get('/timeline/:userId', getTimeline);
router.get('/user/:userId/posts', getUserPosts);

export default router;
