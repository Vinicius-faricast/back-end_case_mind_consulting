import { db } from '../config/database';
import { hashPassword, comparePassword } from '../utils/auth';
import { User, UserCreateDTO } from '../interfaces';

export async function createUser(data: UserCreateDTO): Promise<User> {
  const [result]: any = await db.query(
    `INSERT INTO users (name, email, password, active, created_at, updated_at)
     VALUES (?, ?, ?, 1, NOW(), NOW())`,
    [data.name, data.email, data.password]
  );

  return {
    id: result.insertId,
    name: data.name,
    email: data.email,
    password: data.password,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const [rows]: any = await db.query(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0];
}
