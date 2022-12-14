import { Injectable, NotFoundException } from '@nestjs/common';
import { Responsibles } from '@prisma/client';
import { CreateResponsibleDto } from './dtos/responsible-dto';
import { AddressData, getAddress } from 'src/utils/getAddress';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ResponsibleService {
  constructor(private prisma: PrismaService) {}

  async createResponsible(data: CreateResponsibleDto): Promise<Responsibles> {
    const addressData = await getAddress(data.cep);
    if (!addressData.cep) throw new NotFoundException('CEP não localizado!');
    const address = await this.createAddress(addressData);

    return this.prisma.responsibles.create({
      data: {
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        companyId: data.companyId,
        addressId: address.id,
        locationId: data.locationId,
      },
    });
  }

  async updateResponsible(
    data: CreateResponsibleDto,
  ): Promise<Responsibles | null> {
    const addressData = await getAddress(data.cep);
    if (!addressData.cep) throw new NotFoundException('CEP não localizado!');
    const address = await this.createAddress(addressData);

    return this.prisma.responsibles.upsert({
      where: {
        cpf: data.cpf,
      },
      update: {
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        companyId: data.companyId,
        addressId: address.id,
        locationId: data.locationId,
      },
      create: {
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        companyId: data.companyId,
        addressId: address.id,
        locationId: data.locationId,
      },
    });
  }

  async findResponsible(data: string): Promise<Responsibles | null> {
    return this.prisma.responsibles.findUnique({
      where: {
        cpf: data,
      },
    });
  }

  async createAddress(addressData: AddressData) {
    return await this.prisma.addresses.create({
      data: {
        city: addressData.localidade,
        district: addressData.bairro,
        number: addressData.complemento,
        state: addressData.uf,
        street: addressData.logradouro,
        zipcode: addressData.cep,
      },
    });
    // return await this.prisma.addresses.upsert({
    //   where: {
    //     zipcode: addressData.cep,
    //   },
    //   update: {
    //     city: addressData.localidade,
    //     district: addressData.bairro,
    //     number: addressData.complemento,
    //     state: addressData.uf,
    //     street: addressData.logradouro,
    //   },
    //   create: {
    //     city: addressData.localidade,
    //     district: addressData.bairro,
    //     number: addressData.complemento,
    //     state: addressData.uf,
    //     street: addressData.logradouro,
    //     zipcode: addressData.cep,
    //   },
    // });
  }
}
