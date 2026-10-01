import Notification from '../models/Notification.js';
import HttpError from '../utils/HttpError.js';

export const listNotifications = async (req, res) => {
  const notifications = await Notification.find({ receiver: req.user._id })
    .sort({ createdAt: -1 })
    .limit(30)
    .populate('sender', 'firstName lastName');
  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, receiver: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) {
    throw new HttpError(404, 'Bildirim bulunamadı');
  }
  res.json(notification);
};

export const markAllAsRead = async (req, res) => {
  await Notification.updateMany({ receiver: req.user._id, isRead: false }, { isRead: true });
  res.status(204).end();
};
