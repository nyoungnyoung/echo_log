import { Body, Controller, Get, Post } from '@nestjs/common';
import { EchologsService } from './echologs.service';

@Controller('echologs')
export class EchologsController {
  constructor(private readonly echologsService: EchologsService) {}

  @Post()
  async create(
    @Body('content') content: string,
    @Body('username') username: string,
  ) {
    return this.echologsService.create(content, username);
  }

  @Get()
  async findAll() {
    return this.echologsService.findAll();
  }
}
