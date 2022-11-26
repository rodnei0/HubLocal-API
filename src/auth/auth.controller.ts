import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/user-dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const response = await this.authService.createUser(createUserDto);
    return response.email;
  }

  @Post('sign-in')
  async signIn(@Body() createUserDto: CreateUserDto) {
    return await this.authService.sigIn(createUserDto);
  }
}
