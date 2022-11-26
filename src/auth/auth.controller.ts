import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/user-dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: CreateUserDto) {
    const response = await this.authService.createUser(data);
    return response.email;
  }

  @Post('sign-in')
  async signIn(@Body() data: CreateUserDto) {
    return await this.authService.sigIn(data);
  }
}
