import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminAuthGuard } from 'src/auths/admin-auth.guard';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  getAllUsers(): any {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUsersById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async removeUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUsersById(id);
    if (!user) throw new NotFoundException('User not found');
    await this.userService.deleteUserById(id);
    return { success: true };
  }
}
