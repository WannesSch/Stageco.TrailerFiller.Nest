import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate, IsEmail, IsNotEmpty, ValidatorOptions, ValidationError  } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

  }
}

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export class CreateTrailerDto {
  name: string;
  age: number;
  breed: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
export class CreateAssetDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class CreateSubprojectDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class CreateProjectDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}


