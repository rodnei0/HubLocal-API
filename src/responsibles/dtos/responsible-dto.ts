import { IsString, IsNumber } from 'class-validator';

export class CreateResponsibleDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  cep: string;

  @IsNumber()
  companyId?: number;

  @IsNumber()
  locationId?: number;
}
