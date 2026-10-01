import { Router } from 'express';
import { forgotPassword, login, me, register, resetPassword } from '../controllers/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import validate from '../middleware/validate.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
  forgotPasswordBody,
  loginBody,
  registerBody,
  resetPasswordBody,
} from '../validators/auth.js';

const router = Router();

router.get('/me', requireAuth, me);

router.use(authLimiter);
router.post('/register', validate({ body: registerBody }), asyncHandler(register));
router.post('/login', validate({ body: loginBody }), asyncHandler(login));
router.post(
  '/forgot-password',
  validate({ body: forgotPasswordBody }),
  asyncHandler(forgotPassword)
);
router.post('/reset-password', validate({ body: resetPasswordBody }), asyncHandler(resetPassword));

export default router;
