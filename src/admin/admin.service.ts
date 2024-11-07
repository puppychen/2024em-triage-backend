import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    username: string;
    password: string;
    email: string;
    name: string;
    groupId: number;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.admin.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email,
        name: data.name,
        role: 'user',
        groupId: data.groupId,
      },
    });
  }

  async getUsersByGroupId(groupId: number) {
    return this.prisma.admin.findMany({
      where: { groupId },
      include: { group: true },
    });
  }

  async getAllUsers() {
    return this.prisma.admin.findMany({
      include: { group: true },
    });
  }

  async getUserByUuid(uuid: string) {
    const user = await this.prisma.admin.findFirst({
      where: { uuid },
    });
    if (!user) {
      throw new NotFoundException('User not found or not a user role');
    }
    return user;
  }

  async updateUser(uuid: string, data: { name?: string; email?: string }) {
    return this.prisma.admin.update({
      where: { uuid },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async deleteUser(uuid: string) {
    return this.prisma.admin.delete({
      where: { uuid },
    });
  }

  async getGroupByUuid(uuid: string) {
    return this.prisma.group.findUnique({
      where: { uuid },
    });
  }
}
