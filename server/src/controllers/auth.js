import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { sendPasswordResetMail } from '../lib/mailer.js';
import User from '../models/User.js';
import HttpError from '../utils/HttpError.js';

const RESET_TOKEN_TTL = 60 * 60 * 1000;

const signToken = (user) =>
  jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

const hashResetToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (await User.exists({ email })) {
    throw new HttpError(409, 'Bu e-posta adresi zaten kayıtlı');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 12),
  });

  res.status(201).json({ user, token: signToken(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, 'E-posta veya parola hatalı');
  }

  res.json({ user, token: signToken(user) });
};

export const me = (req, res) => {
  res.json(req.user);
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = hashResetToken(token);
    user.resetPasswordExpires = Date.now() + RESET_TOKEN_TTL;
    await user.save();
    await sendPasswordResetMail(user.email, `${env.CLIENT_URL}/sifre-sifirla/${token}`);
  }

  res.json({ message: 'E-posta adresiniz kayıtlıysa şifre sıfırlama bağlantısı gönderildi' });
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: hashResetToken(token),
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new HttpError(400, 'Sıfırlama bağlantısı geçersiz veya süresi dolmuş');
  }

  user.password = await bcrypt.hash(password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Şifreniz güncellendi' });
};
