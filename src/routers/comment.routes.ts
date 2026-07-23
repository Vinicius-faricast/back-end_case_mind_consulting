import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';

const router = Router();

router.get('/', commentController.listComments);

router.post('/', ...commentController.authenticate, commentController.createComment);

export default router;
