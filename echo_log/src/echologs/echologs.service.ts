import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { CreateEchologDto } from './dto/create-echolog.dto';

const prisma = new PrismaClient();

@Injectable()
export class EchologsService {
  async create(dto: CreateEchologDto) {
    return prisma.echoLog.create({ data: dto });
  }

  async findAll() {
    return prisma.echoLog.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getRandom() {
    const count = await prisma.echoLog.count();
    const skip = Math.floor(Math.random() * count);
    const [randomLog] = await prisma.echoLog.findMany({ skip, take: 1 });
    return randomLog;
  }

  async remove(id: number) {
    return prisma.echoLog.delete({ where: { id } });
  }
}
