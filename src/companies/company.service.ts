import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Companies } from '@prisma/client';
import { ResponsibleService } from 'src/responsibles/responsible.service';
import { CreateCompanyDto } from './dtos/company-dto';

@Injectable()
export class CompanyService {
  constructor(
    private prisma: PrismaService,
    private readonly responsibleService: ResponsibleService,
  ) {}

  async createCompany(data: CreateCompanyDto): Promise<Companies> {
    const company = await this.findCompany(data);
    if (company) throw new ConflictException('Empresa já cadastrada!');

    const responsible = await this.responsibleService.findResponsible(
      data.responsibleCPF,
    );
    if (responsible) throw new ConflictException('Responsável já cadastrado!');

    return this.prisma.companies.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        description: data.description,
      },
    });
  }

  async findCompany(data: CreateCompanyDto): Promise<Companies | null> {
    return this.prisma.companies.findUnique({
      where: {
        cnpj: data.cnpj,
      },
    });
  }

  async findById(id: number): Promise<Companies | null> {
    return this.prisma.companies.findUnique({
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
      },
    });
  }

  async findCompanies(): Promise<Companies[] | null> {
    return this.prisma.companies.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        responsibles: true,
      },
    });
  }

  async updateCompany(
    id: number,
    data: CreateCompanyDto,
  ): Promise<Companies | null> {
    return this.prisma.companies.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async deleteCompany(id: number): Promise<Companies | null> {
    return this.prisma.companies.delete({
      where: {
        id: id,
      },
    });
  }
}
