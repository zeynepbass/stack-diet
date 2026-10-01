import { Router } from 'express';
import authRoutes from './auth.js';
import notificationRoutes from './notifications.js';
import postRoutes from './posts.js';
import userRoutes from './users.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/notifications', notificationRoutes);

export default router;
