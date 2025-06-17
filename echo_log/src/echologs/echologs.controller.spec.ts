import { Test, TestingModule } from '@nestjs/testing';
import { EchologsController } from './echologs.controller';

describe('EchologsController', () => {
  let controller: EchologsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EchologsController],
    }).compile();

    controller = module.get<EchologsController>(EchologsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
