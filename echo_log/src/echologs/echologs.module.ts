import { Module } from '@nestjs/common';
import { EchologsService } from './echologs.service';
import { EchologsController } from './echologs.controller';

@Module({
  providers: [EchologsService],
  controllers: [EchologsController]
})
export class EchologsModule {}
