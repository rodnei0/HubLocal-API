import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResponsibleService } from 'src/responsibles/responsible.service';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/company-dto';
import { CreateResponsibleDto } from 'src/responsibles/dtos/responsible-dto';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly responsibleService: ResponsibleService,
  ) {}
  // constructor(private readonly responsibleService: ResponsibleService) {}

  @Post()
  async create(@Body() data: CreateCompanyDto) {
    const response = await this.companyService.createCompany(data);

    const responsibleData: CreateResponsibleDto = {
      name: data.responsibleName,
      phone: data.responsiblePhone,
      cpf: data.responsibleCPF,
      cep: data.responsibleCEP,
      companyId: response.id,
    };

    await this.responsibleService.createResponsible(responsibleData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.companyService.findById(+id);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.companyService.findCompanies();
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: CreateCompanyDto) {
    await this.companyService.updateCompany(+id, data);

    const responsibleData = {
      name: data.responsibleName,
      phone: data.responsiblePhone,
      cpf: data.responsibleCPF,
      cep: data.responsibleCEP,
      companyId: +id,
    };

    await this.responsibleService.updateResponsible(responsibleData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.companyService.deleteCompany(+id);
  }
}
