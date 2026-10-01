import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    author: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const postSchema = new mongoose.Schema(
  {
    author: { type: ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    comments: [commentSchema],
    likes: [{ type: ObjectId, ref: 'User' }],
  },
  { timestamps: true, toJSON: { versionKey: false } }
);

export default mongoose.model('Post', postSchema);
