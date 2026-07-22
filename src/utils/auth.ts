import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const rounds = 10; // custo do bcrypt; maior = mais lento/melhor
  return bcrypt.hash(password, rounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: { id: number; email: string }): string {
  const secret = process.env.JWT_SECRET || 'segredo';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  // assinatura HS256; cabeceira padrão
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
}

export function verifyToken<T = any>(token: string): T {
  const secret = process.env.JWT_SECRET || 'segredo';
  // retorna o payload decodificado
  return jwt.verify(token, secret) as T;
}
