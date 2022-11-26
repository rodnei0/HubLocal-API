import { Module } from '@nestjs/common';
import { ResponsibleModule } from 'src/responsibles/responsible.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [ResponsibleModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
