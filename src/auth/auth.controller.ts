import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authenticationRequest: { email: string; password: string },
  ) {
    try {
      return this.authService.signIn(authenticationRequest);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
