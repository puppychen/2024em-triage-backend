import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Use JWT and Roles guards
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles('system', 'admin')
  @Post('user')
  async createUser(
    @Body()
    body: {
      username: string;
      password: string;
      email: string;
      name: string;
      groupUuid?: string; // Optional group UUID
    },
    @Req() req: any,
  ) {
    const userRole = req.user.role;
    let groupId: number;

    if (userRole === 'system') {
      if (!body.groupUuid) {
        throw new Error('Group UUID is required for system role');
      }
      // Fetch group ID based on group UUID
      const group = await this.adminService.getGroupByUuid(body.groupUuid);
      if (!group) {
        throw new Error('Invalid group UUID');
      }
      groupId = group.id;
    } else if (userRole === 'admin') {
      // Fetch the user's group ID based on their UUID
      const user = await this.adminService.getUserByUuid(req.user.uuid);
      if (!user) {
        throw new Error('Invalid user UUID');
      }
      groupId = user.groupId;
    }

    return this.adminService.createUser({
      ...body,
      groupId,
    });
  }

  @Roles('system', 'admin')
  @Get('users')
  async getAllUsers(@Req() req: any) {
    const userRole = req.user.role;

    if (userRole === 'system') {
      return this.adminService.getAllUsers();
    } else if (userRole === 'admin') {
      const user = await this.adminService.getUserByUuid(req.user.uuid);
      if (!user) {
        throw new Error('Invalid user UUID');
      }
      return this.adminService.getUsersByGroupId(user.groupId);
    }
  }

  @Roles('admin')
  @Get('user/:uuid')
  getUserByUuid(@Param('uuid') uuid: string) {
    return this.adminService.getUserByUuid(uuid);
  }

  @Roles('admin')
  @Put('user/:uuid')
  updateUser(
    @Param('uuid') uuid: string,
    @Body() body: { name?: string; email?: string },
  ) {
    return this.adminService.updateUser(uuid, body);
  }

  @Roles('admin')
  @Delete('user/:uuid')
  deleteUser(@Param('uuid') uuid: string) {
    return this.adminService.deleteUser(uuid);
  }
}
