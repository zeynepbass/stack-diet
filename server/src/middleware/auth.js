import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import HttpError from '../utils/HttpError.js';
import asyncHandler from '../utils/asyncHandler.js';

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch {
    throw new HttpError(401, 'Oturum geçersiz veya süresi dolmuş');
  }
};

export const requireAuth = asyncHandler(async (req, res, next) => {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw new HttpError(401, 'Oturum açmanız gerekiyor');
  }

  const user = await User.findById(verifyToken(token).id);
  if (!user) {
    throw new HttpError(401, 'Oturum geçersiz veya süresi dolmuş');
  }

  req.user = user;
  next();
});

export const requireSelf = (req, res, next) => {
  if (req.params.id !== req.user.id) {
    throw new HttpError(403, 'Bu işlem için yetkiniz yok');
  }
  next();
};
