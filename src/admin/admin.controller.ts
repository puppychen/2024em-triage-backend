import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard) // 使用 JWT 與角色守衛
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // 只有 'admin' 角色的使用者才能建立 'user' 使用者
  @Roles('admin')
  @Post('user')
  createUser(
    @Body()
    body: {
      username: string;
      password: string;
      email: string;
      name: string;
    },
  ) {
    return this.adminService.createUser(body);
  }

  // 取得所有 'user' 使用者
  @Roles('admin')
  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // 基於 uuid 取得特定的 'user' 使用者
  @Roles('admin')
  @Get('user/:uuid')
  getUserByUuid(@Param('uuid') uuid: string) {
    return this.adminService.getUserByUuid(uuid);
  }

  // 基於 uuid 更新 'user' 使用者的資訊
  @Roles('admin')
  @Put('user/:uuid')
  updateUser(
    @Param('uuid') uuid: string,
    @Body() body: { name?: string; email?: string },
  ) {
    return this.adminService.updateUser(uuid, body);
  }

  // 基於 uuid 刪除 'user' 使用者
  @Roles('admin')
  @Delete('user/:uuid')
  deleteUser(@Param('uuid') uuid: string) {
    return this.adminService.deleteUser(uuid);
  }
}
