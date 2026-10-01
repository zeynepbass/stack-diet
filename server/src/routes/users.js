import { Router } from 'express';
import { deleteUser, getUser, listUsers, updateUser } from '../controllers/users.js';
import { requireAuth, requireSelf } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import asyncHandler from '../utils/asyncHandler.js';
import { idParams } from '../validators/common.js';
import { updateUserBody } from '../validators/users.js';

const router = Router();

router.use(requireAuth);

router.get('/', asyncHandler(listUsers));
router.get('/:id', validate({ params: idParams }), asyncHandler(getUser));
router.patch(
  '/:id',
  validate({ params: idParams, body: updateUserBody }),
  requireSelf,
  asyncHandler(updateUser)
);
router.delete('/:id', validate({ params: idParams }), requireSelf, asyncHandler(deleteUser));

export default router;
