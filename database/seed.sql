USE blog_system;

-- Usuário admin para testes
-- Senha: admin123
INSERT IGNORE INTO users (name, email, password, active, created_at, updated_at)
VALUES (
  'Admin',
  'admin@example.com',
  '$2a$10$wEH.SoFKiJpEu5x5qzL3iOa8j/bN0PKPVtPXfUc0W/4n3X7j7dL9e',
  1,
  NOW(),
  NOW()
);

-- Artigo exemplo
INSERT IGNORE INTO articles (user_id, title, content, published, published_at, active, created_at, updated_at)
VALUES (
  1,
  'Artigo exemplo',
  'Este é um artigo de exemplo criado pelo seed.sql.',
  1,
  NOW(),
  1,
  NOW(),
  NOW()
);

-- Comentário exemplo
INSERT IGNORE INTO comments (article_id, user_id, comment, active, created_at, updated_at)
VALUES (
  1,
  1,
  'Comentário de exemplo no artigo exemplo.',
  1,
  NOW(),
  NOW()
);
