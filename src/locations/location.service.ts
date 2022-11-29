import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Locations } from '@prisma/client';
import { ResponsibleService } from 'src/responsibles/responsible.service';
import { CreateLocationDto } from './dtos/location-dto';
import { getAddress } from 'src/utils/getAddress';

@Injectable()
export class LocationService {
  constructor(
    private prisma: PrismaService,
    private readonly responsibleService: ResponsibleService,
  ) {}

  async createLocation(data: CreateLocationDto): Promise<Locations> {
    const responsible = await this.responsibleService.findResponsible(
      data.responsibleCPF,
    );
    if (responsible) throw new ConflictException('Responsável já cadastrado!');

    const addressData = await getAddress(data.cep);
    const address = await this.responsibleService.createAddress(addressData);

    return this.prisma.locations.create({
      data: {
        name: data.name,
        addressId: address.id,
        companyId: parseInt(data.companyId),
      },
    });
  }

  async findById(id: number): Promise<Locations | null> {
    return this.prisma.locations.findUnique({
      where: {
        id: id,
      },
      include: {
        responsibles: {
          include: {
            address: {
              select: {
                zipcode: true,
              },
            },
          },
        },
        address: {
          select: {
            zipcode: true,
          },
        },
      },
    });
  }

  async findLocations(): Promise<Locations[] | null> {
    return this.prisma.locations.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        responsibles: true,
        company: true,
        address: {
          select: {
            zipcode: true,
          },
        },
      },
    });
  }

  async updateLocation(
    id: number,
    data: CreateLocationDto,
  ): Promise<Locations | null> {
    const addressData = await getAddress(data.cep);
    const address = await this.responsibleService.createAddress(addressData);

    return this.prisma.locations.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        addressId: address.id,
      },
    });
  }

  async deleteLocation(id: number): Promise<Locations | null> {
    return this.prisma.locations.delete({
      where: {
        id: id,
      },
    });
  }
}
