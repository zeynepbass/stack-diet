import { Router } from 'express';
import { listNotifications, markAllAsRead, markAsRead } from '../controllers/notifications.js';
import { requireAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import asyncHandler from '../utils/asyncHandler.js';
import { idParams } from '../validators/common.js';

const router = Router();

router.use(requireAuth);

router.get('/', asyncHandler(listNotifications));
router.patch('/read', asyncHandler(markAllAsRead));
router.patch('/:id/read', validate({ params: idParams }), asyncHandler(markAsRead));

export default router;
