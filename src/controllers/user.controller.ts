import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { generateToken, hashPassword, comparePassword } from '../utils/auth';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    // inputs mínimos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Campos obrigatórios: name, email, password' });
    }

    const existing = await userService.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    const passwordHash = data.password
      ? await hashPassword(data.password)
      : '';

    const user = await userService.createUser({
      name,
      email,
      password: passwordHash,
    });

    // Retorna usuário sem expor senha
    const { password: _, ...safeUser } = user as any;
    return res.status(201).json(safeUser);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Informe email e senha' });
    }

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const ok = await comparePassword(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = generateToken({ id: user.id, email: user.email });

    return res.status(200).json({ access_token: token });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response) {
  const user = (req as any).user;
  const { password: _p, ...safe } = user;
  return res.status(200).json(safe);
}
