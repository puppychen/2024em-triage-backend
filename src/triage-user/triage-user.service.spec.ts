import { Test, TestingModule } from '@nestjs/testing';
import { TriageUserService } from './triage-user.service';

describe('TriageUserService', () => {
  let service: TriageUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriageUserService],
    }).compile();

    service = module.get<TriageUserService>(TriageUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
