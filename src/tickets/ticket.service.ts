import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Status, Tickets } from '@prisma/client';
import { CreateTicketDto } from './dtos/ticket-dto';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateTicket(
    id: number,
    data: Partial<CreateTicketDto>,
  ): Promise<Tickets> {
    const ticket = await this.finByStatus(id);
    const uuid = uuidv4();
    if (ticket.length === 0) {
      return this.prisma.tickets.create({
        data: {
          uuid,
          title: `${data.locationName}-${uuid}`,
          creationDate: dayjs().toDate(),
          createdById: data.createdById,
          locationId: id,
        },
      });
    } else {
      return this.prisma.tickets.update({
        where: {
          id: ticket[0].id,
        },
        data: {
          updateDate: dayjs().toDate(),
          updateById: data.updateById,
          responsibleId: data.responsibleId,
          status: data.status as Status,
        },
      });
    }
  }

  async finByStatus(id: number): Promise<Tickets[] | null> {
    return this.prisma.tickets.findMany({
      where: {
        OR: [
          {
            status: 'PENDENTE',
          },
          {
            status: 'PROGRESSO',
          },
        ],
        AND: {
          id: id,
        },
      },
    });
  }

  async findTickets(): Promise<Tickets[] | null> {
    return this.prisma.tickets.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        createdBy: true,
        location: true,
      },
    });
  }

  async findById(id: number): Promise<Tickets | null> {
    return this.prisma.tickets.findUnique({
      where: {
        id: id,
      },
      include: {
        createdBy: true,
        location: true,
      },
    });
  }
}
