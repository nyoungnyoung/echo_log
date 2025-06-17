import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

@Injectable()
export class EchologsService {
  async create(content: string, username: string) {
    return prisma.echoLog.create({ data: { content, username } });
  }

  async findAll() {
    return prisma.echoLog.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
