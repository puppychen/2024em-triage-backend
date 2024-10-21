import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('groups')
@UseGuards(RolesGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles('admin') // 只有 'admin' 角色可以創建群組
  @Post()
  createGroup(@Body() body: { name: string; description?: string }) {
    return this.groupService.createGroup(body.name, body.description);
  }

  @Roles('admin') // 只有 'admin' 角色可以查看特定群組
  @Get(':id')
  getGroupById(@Param('id') id: number) {
    return this.groupService.getGroupById(id);
  }

  @Roles('admin') // 只有 'admin' 角色可以更新群組
  @Put(':id')
  updateGroup(
    @Param('id') id: number,
    @Body() body: { name: string; description?: string },
  ) {
    return this.groupService.updateGroup(id, body.name, body.description);
  }

  @Roles('admin') // 只有 'admin' 角色可以刪除群組
  @Delete(':id')
  deleteGroup(@Param('id') id: number) {
    return this.groupService.deleteGroup(id);
  }

  @Roles('admin') // 只有 'admin' 角色可以查看所有群組
  @Get()
  getAllGroups() {
    return this.groupService.getAllGroups();
  }
}
