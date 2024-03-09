import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Delete,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auths')
export class AuthsController {
  constructor(private authService: AuthsService) {}

  @Post('/register')
  async register(@Body() registerData: RegisterDTO) {
    this.authService.register(registerData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    res.cookie('auth', tokens, { httpOnly: true });
    res.send({
      message: 'success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Response() res) {
    res.clearCookie('auth', { httpOnly: true });
    res.send({
      message: 'success',
    });
  }
}
