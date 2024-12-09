import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TriageUserService } from './triage-user.service';
import {
  CreateTriageUserDto,
  UpdateTriageUserDto,
  CountTriageUsersDto,
} from './dto';
import { JwtAdminGuard } from '../auth/jwt-admin.guard';
import { SearchTriageUserDto } from './dto/search-triage-user.dto';
import { plainToInstance } from 'class-transformer';
import { TriageUserResponseDto } from './dto/triage-user-response.dto';
import { SearchEpidemicTriageUserDto } from './dto/search-epidemic-triage-user.dto';
import { SearchSpecialCaseTriageUserDto } from './dto/search-special-case-triage-user.dto';

@Controller('triage-user')
@UseGuards(JwtAdminGuard)
export class TriageUserController {
  constructor(private readonly triageUserService: TriageUserService) {}

  @Post()
  async create(
    @Body() createTriageUserDto: CreateTriageUserDto,
    @Req() req: any,
  ) {
    const userUuid = req.user.uuid;
    return this.triageUserService.create(createTriageUserDto, userUuid);
  }

  @Post('search')
  async findAll(@Body() body: SearchTriageUserDto, @Req() req: any) {
    const userUuid = req.user.uuid;
    const userRole = req.user.role;
    return this.triageUserService.findAll(body, userUuid, userRole);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const triageUser = this.triageUserService.findOne(+id);
    return plainToInstance(TriageUserResponseDto, triageUser, {
      excludeExtraneousValues: true, // 排除未使用 @Expose 的欄位
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTriageUserDto: UpdateTriageUserDto,
  ) {
    return this.triageUserService.update(+id, updateTriageUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.triageUserService.remove(+id);
  }

  @Post('search-epidemic')
  async searchEpidemic(
    @Body() body: SearchEpidemicTriageUserDto,
    @Req() req: any,
  ) {
    const userUuid = req.user.uuid;
    const userRole = req.user.role;
    return this.triageUserService.findAllEpidemic(body, userUuid, userRole);
  }

  @Post('search-special')
  async searchSpecial(
    @Body() body: SearchSpecialCaseTriageUserDto,
    @Req() req: any,
  ) {
    const userUuid = req.user.uuid;
    const userRole = req.user.role;
    return this.triageUserService.findAllSpecialCase(body, userUuid, userRole);
  }

  @Post('count')
  async countTriageUsers(@Body() body: CountTriageUsersDto, @Req() req: any) {
    const userUuid = req.user.uuid;
    const userRole = req.user.role;
    return this.triageUserService.countTriageUsers(body, userUuid, userRole);
  }
}
