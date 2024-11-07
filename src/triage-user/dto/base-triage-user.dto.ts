import {
  IsString,
  IsInt,
  IsOptional,
  IsDate,
  IsDateString,
} from 'class-validator';

export class BaseTriageUserDto {
  @IsOptional()
  @IsString()
  medicalRecordNumber?: string; // 病歷號

  @IsOptional()
  @IsString()
  sex?: string; // 性別

  @IsInt()
  deptId: number; // 科別 ID

  @IsDateString()
  registrationDate: Date; // 掛號日期

  @IsDateString()
  birthdate: Date; // 出生日

  @IsOptional()
  @IsInt()
  ctasType1Id?: number; // 大分類 ID

  @IsOptional()
  @IsInt()
  ctasType2Id?: number; // 檢傷標準主訴 ID

  @IsOptional()
  @IsInt()
  ctasType3Id?: number; // 檢傷分級判定依據 ID

  @IsOptional()
  @IsString()
  age?: string; // 年齡

  @IsOptional()
  @IsString()
  arrivalMethod?: string; // 到達方式

  @IsOptional()
  @IsString()
  temperature?: string; // 體溫

  @IsOptional()
  @IsString()
  pulse?: string; // 脈搏

  @IsOptional()
  @IsString()
  respiration?: string; // 呼吸

  @IsOptional()
  @IsString()
  oxygenSaturation?: string; // 血氧飽和度

  @IsOptional()
  @IsString()
  bloodPressureSYS?: string; // 血壓 SYS

  @IsOptional()
  @IsString()
  bloodPressureDIA?: string; // 血壓 DIA

  @IsOptional()
  @IsString()
  weight?: string; // 體重

  @IsOptional()
  @IsString()
  epidemicNote?: string; // 備註

  @IsOptional()
  @IsInt()
  consciousnessE?: number; // 清醒度 E

  @IsOptional()
  @IsInt()
  consciousnessV?: number; // 清醒度 V

  @IsOptional()
  @IsInt()
  consciousnessM?: number; // 清醒度 M

  @IsOptional()
  @IsInt()
  computerGrade?: number; // 電腦化分級

  @IsOptional()
  @IsInt()
  elderlyTriageGrade?: number; // 老年分級

  @IsOptional()
  @IsInt()
  frailtyGrade?: number; // 衰弱指標

  @IsOptional()
  @IsInt()
  modifiedGrade?: number; // 修正分級

  @IsOptional()
  @IsString()
  modifiedGradeDescription?: string; // 修正分級描述

  @IsOptional()
  @IsString()
  complaintEdit?: string; // 主訴編輯
}
