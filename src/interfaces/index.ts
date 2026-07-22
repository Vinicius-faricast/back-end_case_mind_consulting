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