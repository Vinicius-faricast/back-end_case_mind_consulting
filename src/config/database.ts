import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'blog_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testConnection() {
  try {
    const conn = await db.getConnection();
    console.log(`MySQL conectado com sucesso (threadId=${conn.threadId})`);
    conn.release();
  } catch (err) {
    console.error('Erro ao conectar no MySQL:', err);
    process.exit(1);
  }
}
