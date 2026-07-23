import { Router } from 'express';
import * as articleController from '../controllers/article.controller';

const router = Router();

router.get('/', articleController.listArticles);

router.post('/', ...articleController.authenticate, articleController.createArticle);

router.put('/:id', ...articleController.authenticate, articleController.updateArticle);

router.delete('/:id', ...articleController.authenticate, articleController.removeArticle);

export default router;
