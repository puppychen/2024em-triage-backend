import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(name: string, description?: string) {
    return this.prisma.group.create({
      data: { name, description },
    });
  }

  async getGroupById(id: number) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: { Admin: true },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async updateGroup(id: number, name: string, description?: string) {
    return this.prisma.group.update({
      where: { id },
      data: { name, description },
    });
  }

  async deleteGroup(id: number) {
    return this.prisma.group.delete({
      where: { id },
    });
  }

  async getAllGroups() {
    return this.prisma.group.findMany({
      include: { Admin: true },
    });
  }
}