import express from 'express';
import { createPost,getPostById, deletePost, getUserPosts,getFeedPosts } from '../controllers/post.controller';

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', deletePost);
router.get('/posts/user/:uid', getUserPosts);
router.get('/posts/feed/:uid', getFeedPosts);

export default router;
