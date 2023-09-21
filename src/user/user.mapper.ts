import { User as UserPrisma } from '@prisma/client';

import { User } from './user';

const mapToUser = ({ id, name, email, password, role }: UserPrisma): User =>
  new User({
    id,
    name,
    email,
    password,
    role,
  });

export const mapToUsers = (usersPrisma: UserPrisma[]): User[] =>
  usersPrisma.map((user) => mapToUser(user));

export const mapToSingleUser = (userPrisma: UserPrisma): User =>
  mapToUser(userPrisma);

export default { mapToUsers, mapToSingleUser };
