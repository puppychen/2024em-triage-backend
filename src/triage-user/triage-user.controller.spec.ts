import { Test, TestingModule } from '@nestjs/testing';
import { TriageUserController } from './triage-user.controller';

describe('TriageUserController', () => {
  let controller: TriageUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriageUserController],
    }).compile();

    controller = module.get<TriageUserController>(TriageUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
