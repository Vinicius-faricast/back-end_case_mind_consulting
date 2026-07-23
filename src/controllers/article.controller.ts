import { Request, Response, NextFunction } from 'express';
import * as articleService from '../services/article.service';
import * as commentService from '../services/comment.service';
import { authMiddleware } from '../utils/middleware';
import { User } from '../interfaces';

export const authenticate = [authMiddleware];

export async function createArticle(req: any, res: Response, next: NextFunction) {
  try {
    const { title, content, published } = req.body;
    const user = req.user as User;

    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
    }

    const isPublished = published === 'true' || published === true;

    const article = await articleService.createArticle({
      user_id: user.id,
      title,
      content,
      banner_image: req.file?.buffer,
      banner_mimetype: req.file?.mimetype,
      published: isPublished,
      published_at: isPublished ? new Date() : undefined,
    });

    return res.status(201).json(article);
  } catch (err) {
    next(err);
  }
}

export async function updateArticle(req: any, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const user = req.user as User;

    const existing = await articleService.findArticleById(Number(id));
    if (!existing) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    if (existing.user_id !== user.id) {
      return res.status(403).json({ message: 'Sem permissão para editar este artigo' });
    }

    const isPublished = published === 'true' || published === true || existing.published;
    const updated = await articleService.updateArticle(Number(id), {
      title,
      content,
      banner_image: req.file?.buffer,
      banner_mimetype: req.file?.mimetype,
      published: isPublished,
      published_at: isPublished ? existing.published_at || new Date() : undefined,
    });

    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function removeArticle(req: any, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = req.user as User;

    const existing = await articleService.findArticleById(Number(id));
    if (!existing) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    if (existing.user_id !== user.id) {
      return res.status(403).json({ message: 'Sem permissão para remover este artigo' });
    }

    await articleService.removeArticle(Number(id));
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function listArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await articleService.listArticles();
    return res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const article = await articleService.findArticleById(Number(id));
    if (!article || !article.active) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    const comments = await commentService.listCommentsByArticle(Number(id));

    const { banner_image, ...safeArticle } = article as any;
    return res.status(200).json({ ...safeArticle, comments });
  } catch (err) {
    next(err);
  }
}
