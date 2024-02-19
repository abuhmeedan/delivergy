import { Controller, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from './user-roles.decorator';
import { RoleGuard } from './user-roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch('admin/users/:userId')
  @Roles('admin')
  @UseGuards(RoleGuard)
  updateStatus(
    @Param('userId') userId: string,
    @Body() updateStatusDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateStatusDto);
  }
}
