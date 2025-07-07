import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EchologsService } from './echologs.service';
import { CreateEchologDto } from './dto/create-echolog.dto';

@Controller('echologs')
export class EchologsController {
  constructor(private readonly echologsService: EchologsService) {}

  @Post()
  create(@Body() dto: CreateEchologDto) {
    return this.echologsService.create(dto);
  }

  @Get()
  findAll() {
    return this.echologsService.findAll();
  }

  @Get('random')
  getRandom() {
    return this.echologsService.getRandom();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.echologsService.remove(+id);
  }
}
