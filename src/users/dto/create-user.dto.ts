import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'password Cannot be lass than 8 charachters' })
  password: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'firstName Cannot be lass than 2 charachters' })
  firstName: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'lastName Cannot be lass than 2 charachters' })
  lastName: string;
}
