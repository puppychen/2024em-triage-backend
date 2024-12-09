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
import { JwtAdminGuard } from '../auth/jwt-admin.guard';

@Controller('groups')
@UseGuards(JwtAdminGuard, RolesGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles('system')
  @Post()
  createGroup(@Body() body: { name: string; description?: string }) {
    return this.groupService.createGroup(body.name, body.description);
  }

  @Roles('system', 'admin')
  @Get(':uuid')
  getGroupByUuid(@Param('uuid') uuid: string) {
    return this.groupService.getGroupByUuid(uuid);
  }

  @Roles('system')
  @Put(':uuid')
  updateGroup(
    @Param('uuid') uuid: string,
    @Body() body: { name: string; description?: string },
  ) {
    return this.groupService.updateGroup(uuid, body.name, body.description);
  }

  @Roles('system')
  @Delete(':uuid')
  deleteGroup(@Param('uuid') uuid: string) {
    return this.groupService.deleteGroup(uuid);
  }

  @Roles('system', 'admin')
  @Get()
  getAllGroups() {
    return this.groupService.getAllGroups();
  }
}
