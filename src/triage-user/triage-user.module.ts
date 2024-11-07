import { Module } from '@nestjs/common';
import { TriageUserService } from './triage-user.service';
import { TriageUserController } from './triage-user.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [TriageUserService, PrismaService],
  controllers: [TriageUserController],
})
export class TriageUserModule {}
