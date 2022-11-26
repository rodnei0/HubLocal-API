import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './companies/company.module';
import { ResponsibleModule } from './responsibles/responsible.module';

@Module({
  imports: [PrismaModule, AuthModule, CompanyModule, ResponsibleModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
