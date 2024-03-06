import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auths')
export class AuthsController {
  constructor(private authService: AuthsService) {}

  @Post('/register')
  async register(@Body() registerData: RegisterDTO) {
    this.authService.register(registerData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
