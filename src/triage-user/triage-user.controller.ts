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
import { CreateTriageUserDto, UpdateTriageUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('triage-user')
export class TriageUserController {
  constructor(private readonly triageUserService: TriageUserService) {}

  @Post()
  async create(
    @Body() createTriageUserDto: CreateTriageUserDto,
    @Req() req: any,
  ) {
    const userUuid = req.user.uuid; // 假設 JWT payload 中有 userId
    return this.triageUserService.create(createTriageUserDto, userUuid);
  }

  @Get()
  async findAll() {
    return this.triageUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.triageUserService.findOne(+id);
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
}
