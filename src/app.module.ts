import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './companies/company.module';
import { ResponsibleModule } from './responsibles/responsible.module';
import { LocationModule } from './locations/location.module';
import { TicketModule } from './tickets/ticket.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CompanyModule,
    LocationModule,
    ResponsibleModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
