import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; user: object }> {
    const user = await this.usersService.findByEmail(
      loginUserDto.email.toLowerCase(),
    );
    if (user !== null) {
      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(
        loginUserDto.password,
        hashedPassword,
      );

      if (user && isMatch) {
        const payload = {
          email: user.email,
          userId: user._id,
          role: user.role,
        };
        const accessToken = await this.getAccessToken(payload);

        return {
          accessToken: accessToken,
          user: payload,
        };
      }
    }

    throw new UnauthorizedException({
      code: 401,
      message: 'invalid email or password',
    });
  }

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ email: string; id: string }> {
    const user = await this.usersService.create(createUserDto);
    return { email: user.email, id: user._id };
  }
  async getAccessToken(payload: object) {
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }
}
