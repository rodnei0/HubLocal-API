import { Module } from '@nestjs/common';
import { ResponsibleModule } from 'src/responsibles/responsible.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [ResponsibleModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
