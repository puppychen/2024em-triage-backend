import { Controller, Get, Param } from '@nestjs/common';
import { DeptService } from './dept.service';

@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get()
  async getAllDepts() {
    return this.deptService.getAllDepts();
  }

  @Get(':id')
  async getDeptHierarchy(@Param('id') id: string) {
    const deptId = parseInt(id, 10);
    if (isNaN(deptId)) {
      throw new Error('Invalid department ID');
    }
    return this.deptService.getDeptHierarchy(deptId);
  }
}
