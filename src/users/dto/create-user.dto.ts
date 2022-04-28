import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(5)
  password: string;
  
  @IsString()
  @IsNotEmpty()
  name: string;
}
