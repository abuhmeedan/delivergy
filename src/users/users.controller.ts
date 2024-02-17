import { Controller, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Roles } from './user-roles.decorator';
import { RoleGuard } from './user-roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch('users/:userId')
  @Roles('user')
  @UseGuards(RoleGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateStatusDto);
  }
}
