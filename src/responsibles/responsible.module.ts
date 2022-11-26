import { Module } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ResponsibleService],
  exports: [ResponsibleService],
})
export class ResponsibleModule {}
