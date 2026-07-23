import { Router } from 'express';
import * as articleController from '../controllers/article.controller';
import { singleBanner } from '../utils/multer';

const router = Router();

router.get('/', articleController.listArticles);

router.post('/', singleBanner, articleController.authenticate, articleController.createArticle);

router.put('/:id', articleController.authenticate, singleBanner, articleController.updateArticle);

router.delete('/:id', articleController.authenticate, articleController.removeArticle);

export default router;
