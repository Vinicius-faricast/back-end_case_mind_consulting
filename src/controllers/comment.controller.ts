import { Request, Response, NextFunction } from 'express';
import * as commentService from '../services/comment.service';
import { authMiddleware } from '../utils/middleware';

export const authenticate = [authMiddleware];

export async function createComment(req: any, res: Response, next: NextFunction) {
  try {
    const { article_id, comment } = req.body;
    const user = req.user as any;

    if (!article_id || !comment) {
      return res.status(400).json({ message: 'Campos obrigatórios: article_id, comment' });
    }

    const created = await commentService.createComment({
      article_id: Number(article_id),
      user_id: user.id,
      comment,
    });

    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function listComments(req: Request, res: Response, next: NextFunction) {
  try {
    const { article_id } = req.query;
    const articleId = Number(article_id);
    const rows = await commentService.listCommentsByArticle(articleId);
    return res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}
