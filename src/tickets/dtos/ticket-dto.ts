import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  uuid: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsDate()
  creationDate: Date;

  @IsOptional()
  @IsNumber()
  createdById: number;

  @IsOptional()
  @IsString()
  updateDate?: string;

  @IsOptional()
  @IsNumber()
  updateById?: number;

  @IsOptional()
  @IsNumber()
  locationId: number;

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsNumber()
  responsibleId: number;

  @IsOptional()
  @IsString()
  status: string;
}
