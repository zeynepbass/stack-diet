import { Router } from 'express';
import {
  addComment,
  createPost,
  deletePost,
  getPost,
  listPosts,
  toggleLike,
  updatePost,
} from '../controllers/posts.js';
import { requireAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import asyncHandler from '../utils/asyncHandler.js';
import { idParams } from '../validators/common.js';
import { commentBody, postBody } from '../validators/posts.js';

const router = Router();

router.use(requireAuth);

router.get('/', asyncHandler(listPosts));
router.post('/', validate({ body: postBody }), asyncHandler(createPost));
router.get('/:id', validate({ params: idParams }), asyncHandler(getPost));
router.put('/:id', validate({ params: idParams, body: postBody }), asyncHandler(updatePost));
router.delete('/:id', validate({ params: idParams }), asyncHandler(deletePost));
router.post('/:id/like', validate({ params: idParams }), asyncHandler(toggleLike));
router.post(
  '/:id/comments',
  validate({ params: idParams, body: commentBody }),
  asyncHandler(addComment)
);

export default router;
