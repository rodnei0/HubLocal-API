import { Module } from '@nestjs/common';
import { ResponsibleModule } from 'src/responsibles/responsible.module';
import { TicketModule } from 'src/tickets/ticket.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [ResponsibleModule, TicketModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
