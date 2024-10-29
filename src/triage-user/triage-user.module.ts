import { Module } from '@nestjs/common';
import { TriageUserService } from './triage-user.service';
import { TriageUserController } from './triage-user.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TriageUserService, PrismaService],
  controllers: [TriageUserController],
})
export class TriageUserModule {}
