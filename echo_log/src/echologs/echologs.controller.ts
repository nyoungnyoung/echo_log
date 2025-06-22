import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EchologsService } from './echologs.service';
import { CreateEchologDto } from './dto/create-echolog.dto';

@Controller('echologs')
export class EchologsController {
  constructor(private readonly echologsService: EchologsService) {}

  @Post()
  async create(@Body() dto: CreateEchologDto) {
    return this.echologsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.echologsService.findAll();
  }

  @Get('random')
  async getRandom() {
    return this.echologsService.getRandom();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.echologsService.remove(+id);
  }
}
