import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // 建立新使用者，只針對 role 為 'user'
  async createUser(data: {
    username: string;
    password: string;
    email: string;
    name: string;
  }) {
    return this.prisma.admin.create({
      data: {
        username: data.username,
        password: data.password, // 密碼加密應在 controller 層處理
        email: data.email,
        name: data.name,
        role: 'user', // 強制設定為 'user'
      },
    });
  }

  // 查詢所有 role 為 'user' 的使用者
  async getAllUsers() {
    return this.prisma.admin.findMany({
      where: { role: 'user' },
    });
  }

  // 基於 uuid 查詢特定的 'user' 使用者
  async getUserByUuid(uuid: string) {
    const user = await this.prisma.admin.findFirst({
      where: { uuid, role: 'user' },
    });
    if (!user) {
      throw new NotFoundException('User not found or not a user role');
    }
    return user;
  }

  // 基於 uuid 更新 'user' 使用者的資訊
  async updateUser(uuid: string, data: { name?: string; email?: string }) {
    return this.prisma.admin.update({
      where: { uuid },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  // 基於 uuid 刪除 'user' 使用者
  async deleteUser(uuid: string) {
    return this.prisma.admin.delete({
      where: { uuid, role: 'user' },
    });
  }
}
