import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
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

    throw new UnauthorizedException({ message: 'invalid email or password' });
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
  validateUserRole(token: string, expectedRole: string): boolean {
    const decoded: any = jwt.verify(token, 'your_jwt_secret');
    return decoded.role === expectedRole;
  }
}
