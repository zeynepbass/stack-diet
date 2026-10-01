import Notification from '../models/Notification.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import HttpError from '../utils/HttpError.js';

export const listUsers = async (req, res) => {
  const users = await User.find().select('firstName lastName').sort('firstName');
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('firstName lastName avatar');
  if (!user) {
    throw new HttpError(404, 'Kullanıcı bulunamadı');
  }
  res.json(user);
};

export const updateUser = async (req, res) => {
  req.user.set(req.body);
  await req.user.save();
  res.json(req.user);
};

export const deleteUser = async (req, res) => {
  const userId = req.user._id;

  await Promise.all([
    Post.deleteMany({ author: userId }),
    Notification.deleteMany({ $or: [{ sender: userId }, { receiver: userId }] }),
  ]);
  await Post.updateMany({}, { $pull: { likes: userId, comments: { author: userId } } });
  await req.user.deleteOne();

  res.status(204).end();
};
