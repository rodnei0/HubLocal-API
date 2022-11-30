import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Users, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    const user = await this.findUser(data);
    if (user) throw new ConflictException('Email já cadastrado!');

    const hashedPassword = bcrypt.hashSync(data.password, 12);

    return this.prisma.users.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async sigIn(data: Prisma.UsersCreateInput): Promise<string> {
    const user = await this.findUser(data);
    if (!user) throw new NotFoundException('Usuário não existe!');

    if (!bcrypt.compareSync(data.password, user.password))
      throw new UnauthorizedException('Senha incorreta, tente novamente!');

    const token = jwt.sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.JWT_SECRET,
    );

    return token;
  }

  async findUser(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: {
        email: userWhereUniqueInput.email,
      },
    });
  }

  async getUsers(): Promise<{ email: string }[] | null> {
    const response = await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    return response;
  }
}
