import { IsOptional, IsString, IsDateString } from 'class-validator';

export class SearchTriageUserDto {
  @IsOptional()
  @IsString()
  dateType?: 'registration' | 'createdAt';

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  medicalRecordNumber?: string;

  @IsOptional()
  @IsString()
  deptId?: string;

  @IsOptional()
  @IsString()
  arrivalMethod?: string;

  @IsOptional()
  @IsString()
  grade?: string;
}
