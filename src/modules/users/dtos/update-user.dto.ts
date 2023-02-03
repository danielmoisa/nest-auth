import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class UpdateUserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    hash: string;
  
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string;
  }