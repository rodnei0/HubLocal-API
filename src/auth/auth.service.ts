import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.findUser(data);
    if (user) throw new ConflictException('Email já cadastrado!');

    const hashedPassword = bcrypt.hashSync(data.password, 12);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async sigIn(data: Prisma.UserCreateInput): Promise<string> {
    const user = await this.findUser(data);
    if (!user) throw new NotFoundException('Usuário não existe!');

    if (!bcrypt.compareSync(data.password, user.password))
      throw new UnauthorizedException('Senha incorreta, tente novamente!');

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
    );

    return token;
  }

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: userWhereUniqueInput.email,
      },
    });
  }
}
