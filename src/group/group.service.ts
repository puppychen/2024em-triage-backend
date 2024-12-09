import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(name: string, description?: string) {
    return this.prisma.group.create({
      data: { name, description },
    });
  }

  async getGroupByUuid(uuid: string) {
    const group = await this.prisma.group.findUnique({
      where: { uuid },
      include: { Admin: true },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async updateGroup(uuid: string, name: string, description?: string) {
    return this.prisma.group.update({
      where: { uuid },
      data: { name, description },
    });
  }

  async deleteGroup(uuid: string) {
    const group = await this.prisma.group.findUnique({
      where: { uuid },
      include: { Admin: true },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.Admin.length > 0) {
      throw new BadRequestException('Cannot delete group with active admins');
    }

    return this.prisma.group.delete({
      where: { uuid },
    });
  }

  async getAllGroups() {
    return this.prisma.group.findMany({
      include: { Admin: true },
    });
  }
}
