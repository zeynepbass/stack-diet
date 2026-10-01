import rateLimit from 'express-rate-limit';
import env from '../config/env.js';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: { message: 'Çok fazla deneme yaptınız, lütfen daha sonra tekrar deneyin' },
});
