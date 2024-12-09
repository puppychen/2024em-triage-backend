import { PartialType } from '@nestjs/mapped-types';
import { CreateTriageUserDto } from './create-triage-user.dto';

export class UpdateTriageUserDto extends PartialType(CreateTriageUserDto) {}
