import { Body, Controller, Get, Post } from '@nestjs/common';
import { EchologsService } from './echologs.service';

@Controller('echologs')
export class EchologsController {
  constructor(private readonly echologsService: EchologsService) {}

  @Post()
  async create(@Body('content') content: string) {
    return this.echologsService.create(content);
  }

  @Get()
  async findAll() {
    return this.echologsService.findAll();
  }
}
