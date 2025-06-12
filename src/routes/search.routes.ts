import express from 'express';
import { searchUsers } from '../controllers/search.controller';

const router = express.Router();

router.get('/search/users', searchUsers);

export default router;
