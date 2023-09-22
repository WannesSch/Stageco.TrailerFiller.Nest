import { User as UserPrisma } from '@prisma/client';

export class User {
  readonly id?: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role?: string;

  constructor(user: {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }

  equals({ id, name, email, password }): boolean {
    return (
      this.id === id &&
      this.name === name &&
      this.email === email &&
      this.password === password
    );
  }

  static from({ id, name, email, password, role }: UserPrisma) {
    return new User({
      id,
      name,
      email,
      password,
      role,
    });
  }
}
