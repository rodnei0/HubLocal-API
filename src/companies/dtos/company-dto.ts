import { IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  cnpj: string;

  @IsString()
  description: string;

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
