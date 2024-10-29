import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // 假設 Prisma Service 已建立

@Injectable()
export class DeptService {
  constructor(private prisma: PrismaService) {}

  async getAllDepts() {
    return this.prisma.dept.findMany();
  }

  async getDeptHierarchy(deptId: number) {
    return this.prisma.dept.findUnique({
      where: { id: deptId },
      include: {
        ctasType1: {
          include: {
            ctasType2: {
              include: {
                ctasType3: true,
              },
            },
          },
        },
      },
    });
  }
}
