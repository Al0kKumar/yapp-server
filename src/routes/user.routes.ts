import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/user/:id', getUserProfile);
router.put('/user/:id', updateUserProfile);

export default router;
