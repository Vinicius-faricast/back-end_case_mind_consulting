import { db } from '../config/database';
import { hashPassword } from '../utils/auth';
import { Article, ArticleCreateDTO } from '../interfaces';

export async function createArticle(data: ArticleCreateDTO): Promise<Article> {
  const [result]: any = await db.query(
    `INSERT INTO articles
       (user_id, title, content, banner_image, banner_mimetype, published, published_at, active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
    [
      data.user_id,
      data.title,
      data.content,
      data.banner_image ?? null,
      data.banner_mimetype ?? null,
      data.published ? 1 : 0,
      data.published_at ?? null,
    ]
  );

  return {
    id: result.insertId,
    user_id: data.user_id,
    title: data.title,
    content: data.content,
    banner_image: data.banner_image,
    banner_mimetype: data.banner_mimetype,
    published: data.published ?? false,
    published_at: data.published_at ?? null,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export async function findArticleById(id: number): Promise<Article | undefined> {
  const [rows]: any = await db.query(
    'SELECT * FROM articles WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0];
}

export async function listArticles() {
  const [rows]: any = await db.query(
    `SELECT a.*, u.name AS author_name
       FROM articles a
       JOIN users u ON a.user_id = u.id
      WHERE a.active = 1
      ORDER BY a.published_at DESC`
  );
  return rows;
}

export async function updateArticle(id: number, data: Partial<ArticleCreateDTO>) {
  const fields = ['title = ?', 'content = ?', 'published = ?', 'updated_at = NOW()'];
  const values: any[] = [
    data.title,
    data.content,
    data.published ? 1 : 0,
  ];

  if (data.banner_image !== undefined) {
    fields.push('banner_image = ?');
    values.push(data.banner_image);
  }
  if (data.banner_mimetype !== undefined) {
    fields.push('banner_mimetype = ?');
    values.push(data.banner_mimetype);
  }
  if (data.published_at !== undefined) {
    fields.push('published_at = ?');
    values.push(data.published_at);
  }

  values.push(id);

  await db.query(`UPDATE articles SET ${fields.join(', ')} WHERE id = ?`, values);
  return findArticleById(id);
}

export async function removeArticle(id: number) {
  await db.query('UPDATE articles SET active = 0, updated_at = NOW() WHERE id = ?', [id]);
  return { id };
}
