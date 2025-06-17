import { Test, TestingModule } from '@nestjs/testing';
import { EchologsService } from './echologs.service';

describe('EchologsService', () => {
  let service: EchologsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EchologsService],
    }).compile();

    service = module.get<EchologsService>(EchologsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
