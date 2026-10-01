import Notification from '../models/Notification.js';
import Post from '../models/Post.js';
import HttpError from '../utils/HttpError.js';

const authors = [
  { path: 'author', select: 'firstName lastName' },
  { path: 'comments.author', select: 'firstName lastName' },
];

const findOwnPost = async (req) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new HttpError(404, 'Gönderi bulunamadı');
  }
  if (!post.author.equals(req.user._id)) {
    throw new HttpError(403, 'Bu gönderi üzerinde yetkiniz yok');
  }
  return post;
};

export const listPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate(authors);
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(authors);
  if (!post) {
    throw new HttpError(404, 'Gönderi bulunamadı');
  }
  res.json(post);
};

export const createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user._id });
  res.status(201).json(await post.populate(authors));
};

export const updatePost = async (req, res) => {
  const post = await findOwnPost(req);
  post.set(req.body);
  await post.save();
  res.json(await post.populate(authors));
};

export const deletePost = async (req, res) => {
  const post = await findOwnPost(req);
  await post.deleteOne();
  await Notification.deleteMany({ post: post._id });
  res.status(204).end();
};

export const toggleLike = async (req, res) => {
  const userId = req.user._id;

  const post = await Post.findById(req.params.id).select('likes');
  if (!post) {
    throw new HttpError(404, 'Gönderi bulunamadı');
  }

  const alreadyLiked = post.likes.some((id) => id.equals(userId));
  const update = alreadyLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } };

  const updated = await Post.findByIdAndUpdate(post._id, update, {
    new: true,
    timestamps: false,
  }).populate(authors);
  res.json(updated);
};

export const addComment = async (req, res) => {
  const { text } = req.body;

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { text, author: req.user._id } } },
    { new: true }
  ).populate(authors);
  if (!post) {
    throw new HttpError(404, 'Gönderi bulunamadı');
  }

  if (!post.author._id.equals(req.user._id)) {
    await Notification.create({
      type: 'comment',
      post: post._id,
      sender: req.user._id,
      receiver: post.author._id,
      message: `${req.user.firstName}: ${text}`,
    });
  }

  res.status(201).json(post);
};
