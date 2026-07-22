import app from './app';
import { db, testConnection } from './config/database';

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Falha ao iniciar servidor:', err);
    process.exit(1);
  }
}

start();
