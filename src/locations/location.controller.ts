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
import { LocationService as LocationService } from './location.service';
import { CreateLocationDto } from './dtos/location-dto';
import { CreateResponsibleDto } from 'src/responsibles/dtos/responsible-dto';

@Controller('locations')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly responsibleService: ResponsibleService,
  ) {}
  // constructor(private readonly responsibleService: ResponsibleService) {}

  @Post()
  async create(@Body() data: CreateLocationDto) {
    const response = await this.locationService.createLocation(data);

    const responsibleData: CreateResponsibleDto = {
      name: data.responsibleName,
      phone: data.responsiblePhone,
      cpf: data.responsibleCPF,
      cep: data.responsibleCEP,
      locationId: response.id,
    };

    await this.responsibleService.createResponsible(responsibleData);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.locationService.findById(+id);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.locationService.findLocations();
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: CreateLocationDto) {
    await this.locationService.updateLocation(+id, data);

    const responsibleData = {
      name: data.responsibleName,
      phone: data.responsiblePhone,
      cpf: data.responsibleCPF,
      cep: data.responsibleCEP,
      locationId: +id,
    };

    await this.responsibleService.updateResponsible(responsibleData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.locationService.deleteLocation(+id);
  }
}
