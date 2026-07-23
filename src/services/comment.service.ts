import { db } from '../config/database';
import { Comment, CommentCreateDTO } from '../interfaces';

export async function createComment(data: CommentCreateDTO): Promise<Comment> {
  const [result]: any = await db.query(
    `INSERT INTO comments (article_id, user_id, comment, active, created_at, updated_at)
     VALUES (?, ?, ?, 1, NOW(), NOW())`,
    [data.article_id, data.user_id, data.comment]
  );

  return {
    id: result.insertId,
    article_id: data.article_id,
    user_id: data.user_id,
    comment: data.comment,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export async function listCommentsByArticle(articleId: number) {
  const [rows]: any = await db.query(
    `SELECT c.*, u.name AS author_name
       FROM comments c
       JOIN users u ON c.user_id = u.id
      WHERE c.article_id = ? AND c.active = 1
      ORDER BY c.created_at ASC`,
    [articleId]
  );
  return rows;
}
