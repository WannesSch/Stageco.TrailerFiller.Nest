import { User } from '../user/user';
import database from '../prisma/database';

const createUser = async (
  name: string,
  password: string,
  email: string,
): Promise<User> => {
  try {
    const userPrisma = await database.user.create({
      data: {
        name,
        password,
        email,
        role: 'user',
      },
    });
    return User.from(userPrisma);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersPrisma = await database.user.findMany();
    return usersPrisma.map((userPrisma) => User.from(userPrisma));
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const giveAdmin = async (id): Promise<User> => {
  try {
    const userPrisma = await database.user.update({
      where: { id },
      data: {
        role: 'admin',
      },
    });
    return User.from(userPrisma);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};


const getUserById = async ({ id }): Promise<User> => {
  try {
    const userPrisma = await database.user.findUnique({
      where: { id },
    });

    return userPrisma ? User.from(userPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getUserByName = async (name: string): Promise<User> => {
  try {
    const userPrisma = await database.user.findFirst({
      where: { name },
    });
    return userPrisma ? User.from(userPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  getUserByName,
  giveAdmin,
};
