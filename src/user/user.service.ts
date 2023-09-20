import { Injectable } from '@nestjs/common';
import { User } from './user';
import userDB from './user.db'; // Import your userDB module
import { stringify } from 'querystring';
import { UserInput } from './userInput';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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

  async createUser(user:User): Promise<User> {
       
    const existingUser = await userDB.getUserByName(user.name);
    if (existingUser) {
      console.log("User already exists");
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    return await userDB.createUser(user.name, hashedPassword, user.email);
  }

  async authenticate({ name, password }: UserInput): Promise<string> {
    const user = await userDB.getUserByName(name);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
    }
    return this.generateJWTToken(name);
  }

  private generateJWTToken(name: string): string {
    const jwtSecret = process.env.JWT_SECRET;
    
    const options = { expiresIn: '8h', issuer: 'Stageco' };
    try {
      return jwt.sign({ name }, jwtSecret, options); 
    } catch (err) {
      console.log(err);
      throw err; 
    }
  }
}