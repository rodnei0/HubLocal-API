import { IsString, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  cep: string;

  @IsOptional()
  @IsNumber()
  companyId: string;

  @IsString()
  responsibleName: string;

  @IsString()
  responsiblePhone: string;

  @IsString()
  responsibleCPF: string;

  @IsString()
  @Length(8, 8)
  responsibleCEP: string;
}
