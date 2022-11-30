import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketService as TicketService } from './ticket.service';
import { CreateTicketDto } from './dtos/ticket-dto';
import { CreateResponsibleDto } from 'src/responsibles/dtos/responsible-dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async findAll() {
    const response = await this.ticketService.findTickets();
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.ticketService.findById(+id);
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: CreateTicketDto) {
    await this.ticketService.createOrUpdateTicket(+id, data);
  }
}
