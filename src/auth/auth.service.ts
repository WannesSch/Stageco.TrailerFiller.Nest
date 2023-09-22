import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserInput } from 'src/user/userInput';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
}