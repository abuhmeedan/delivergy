import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../users/user-roles.decorator';
import { RoleGuard } from '../users/user-roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(RoleGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(RoleGuard)
  @Get('profile')
  @Roles('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
