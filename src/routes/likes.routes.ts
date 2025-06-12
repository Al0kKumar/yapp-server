import express from 'express';
import { likeTweet,unlikeTweet, getUsersWhoLiked,getTweetsLikedByUser } from '../controllers/like.controller.js';

const router = express.Router();

router.post('/likes', likeTweet);
router.delete('/likes', unlikeTweet);
router.get('/likes/tweet/:tweetId', getUsersWhoLiked);
router.get('/likes/user/:userId', getTweetsLikedByUser);

export default router;
