import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/user-dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.authService.createUser(createUserDto);
  }
}
