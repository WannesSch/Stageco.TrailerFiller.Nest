import { Injectable } from '@nestjs/common';
import { User } from './user';
import userDB from './user.db'; // Import your userDB module
import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');


@Injectable()
export class UserService {
  async getAllUsers(): Promise<User[]> {
    return userDB.getAllUsers();
  }

  async getUserById(id): Promise<User> {
    return userDB.getUserById(id);
  }

  async getUserByName(name): Promise<User> {
    return userDB.getUserByName(name);
  }

  async createUser({ name, password,email }): Promise<User> {
    const existingUser = await this.getUserByName(name);
    if (existingUser) {
      console.log("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    return await userDB.createUser({ name, password: hashedPassword,email });
  }

  async authenticate({ name, password }): Promise<string> {
    const user = await this.getUserByName(name);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
    }
    return this.generateJWTToken(name);
  }

  private generateJWTToken(name: string): string {
    const jwtSecret = process.env.JWT_SECRET;
    const options = { expiresIn: '8h', issuer: 'MovieRate' };
    try {
      return jwt.sign({ name }, jwtSecret, options);
    } catch (err) {
      console.log(err);
      throw err; // You may want to handle this error differently
    }
  }
}