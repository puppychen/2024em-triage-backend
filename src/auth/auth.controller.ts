import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      console.log(body);
      const admin = await this.authService.validateAdmin(
        body.username,
        body.password,
      );
      return this.authService.login(admin);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('register')
  async register(
    @Body()
    body: {
      username: string;
      password: string;
      email: string;
      name: string;
    },
  ) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
