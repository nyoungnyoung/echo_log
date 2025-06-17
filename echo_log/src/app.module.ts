import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EchologsModule } from './echologs/echologs.module';

@Module({
  imports: [EchologsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
