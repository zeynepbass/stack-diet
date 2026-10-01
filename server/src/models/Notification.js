import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['comment'], required: true },
    post: { type: ObjectId, ref: 'Post', required: true },
    sender: { type: ObjectId, ref: 'User', required: true },
    receiver: { type: ObjectId, ref: 'User', required: true, index: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { versionKey: false } }
);

export default mongoose.model('Notification', notificationSchema);
