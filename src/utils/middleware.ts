import { Response, NextFunction } from 'express';
import { verifyToken } from './auth';

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';

  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = parts[1];

  try {
    const decoded: any = verifyToken(token);
    req.user = decoded; // { id, email, iat, exp }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}
