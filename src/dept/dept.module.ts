import { Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DeptController],
  providers: [DeptService, PrismaService],
})
export class DeptModule {}
