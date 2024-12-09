// src/triage-user/dto/search-triage-user.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class SearchEpidemicTriageUserDto {
  @IsOptional() @IsString() dateType?: string;
  @IsOptional() @IsString() startDate?: string;
  @IsOptional() @IsString() endDate?: string;
  @IsOptional() @IsString() medicalRecordNumber?: string;
  @IsOptional() @IsString() deptId?: string;
  @IsOptional() @IsString() arrivalMethod?: string;
  @IsOptional() @IsString() grade?: string;
  @IsOptional() @IsString() cough?: string;
  @IsOptional() @IsString() contact?: string;
  @IsOptional() @IsString() travel?: string;
}
