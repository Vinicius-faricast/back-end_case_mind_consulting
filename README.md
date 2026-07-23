# back-end_case_mind_consulting

## Passo 1: Importar o banco de dados

1) Abra seu cliente MySQL.
2) Abra o arquivo `database/blog_system.sql` e execute no Mysql.
   Ele cria o banco `blog_system` e as tabelas: users, articles, comments.
3) Abra o arquivo `database/seed.sql` e execute no Mysql.
   Ele insere um usuário admin e dados de exemplo.
   Usuário para teste no login:
   - Email: admin@example.com
   - Senha: admin123

## Passo 2: Configurar variáveis de ambiente

1) Remova o `.example` do arquivo `.env.example` para `.env`:

2) Abra o arquivo `.env` e altere os valores conforme seu ambiente:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_DATABASE=blog_system

JWT_SECRET=sua_chave_secreta_muito_segura
PORT=3000
NODE_ENV=development

## Passo 3: Instalar dependências Node.js

1) Abra o terminal.

2) Instale as dependências:
   npm install

Esse comando baixa pacotes como:
- express: servidor web
- mysql2: conexão com MySQL
- bcrypt: criptografia de senha
- jsonwebtoken: JWT para login
- cors: permitir acesso do frontend
- dotenv: carregar variáveis do .env
- typescript, ts-node-dev, @types/*: ferramentas de desenvolvimento

## Passo 4: Rodar o servidor em desenvolvimento

Execute:
npm run dev

Esperado no terminal:
- MySQL conectado com sucesso
- Servidor rodando em http://localhost:3000

## Passo 5: Testar endpoints

Use o Thunder Client, Postman, Insomnia ou curl.

### Criar usuário
POST http://localhost:3000/api/users
Body JSON:
{
  "name": "Maria",
  "email": "maria@example.com",
  "password": "123456"
}

### Login
POST http://localhost:3000/api/users/login
Body JSON:
{
  "email": "maria@example.com",
  "password": "123456"
}

Resposta exemplo:
{
  "access_token": "eyJhb..."
}

### Listar artigos
GET http://localhost:3000/api/articles

### Criar artigo autenticado
POST http://localhost:3000/api/articles
Header:
Authorization: Bearer SEU_TOKEN_AQUI
Body (form-data):
- title: "Novo artigo"
- content: "Conteúdo do artigo..."
- published: true

Nota: upload de banner usa multipart/form-data ; envie campo "banner" com figura opcional.

### Editar artigo
PUT http://localhost:3000/api/articles/1
Authorization: Bearer SEU_TOKEN
Body: mesmo formato do criar

### Remover artigo
DELETE http://localhost:3000/api/articles/1
Authorization: Bearer SEU_TOKEN

### Listar comentários
GET http://localhost:3000/api/comments?article_id=1

### Criar comentário
POST http://localhost:3000/api/comments
Authorization: Bearer SEU_TOKEN
Body JSON:
{
  "article_id": 1,
  "comment": "Ótimo artigo!"
}
