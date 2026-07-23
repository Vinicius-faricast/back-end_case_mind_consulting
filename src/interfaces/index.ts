export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
}

export interface Article {
  id: number;
  user_id: number;
  title: string;
  content: string;
  banner_image?: Buffer;
  banner_mimetype?: string | null;
  published: boolean;
  published_at?: Date | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ArticleCreateDTO {
  user_id: number;
  title: string;
  content: string;
  banner_image?: Buffer;
  banner_mimetype?: string | null;
  published?: boolean;
  published_at?: Date | null;
}

export interface Comment {
  id: number;
  article_id: number;
  user_id: number;
  comment: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CommentCreateDTO {
  article_id: number;
  user_id: number;
  comment: string;
}