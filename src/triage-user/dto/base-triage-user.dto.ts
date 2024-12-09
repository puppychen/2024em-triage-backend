import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';
import { Expose } from 'class-transformer';

export class BaseTriageUserDto {
  @Expose()
  @IsOptional()
  @IsString()
  medicalRecordNumber?: string; // 病歷號

  @Expose()
  @IsOptional()
  @IsString()
  sex?: string; // 性別

  @Expose()
  @IsInt()
  deptId: number; // 科別 ID

  @Expose()
  @IsDateString()
  registrationDate: Date; // 掛號日期

  @Expose()
  @IsDateString()
  birthdate: Date; // 出生日

  @Expose()
  @IsOptional()
  @IsInt()
  ctasType1Id?: number; // 大分類 ID

  @Expose()
  @IsOptional()
  @IsInt()
  ctasType2Id?: number; // 檢傷標準主訴 ID

  @Expose()
  @IsOptional()
  @IsInt()
  ctasType3Id?: number; // 檢傷分級判定依據 ID

  @Expose()
  @IsOptional()
  @IsString()
  age?: string; // 年齡

  @Expose()
  @IsOptional()
  @IsString()
  arrivalMethod?: string; // 到達方式

  @Expose()
  @IsOptional()
  @IsString()
  temperature?: string; // 體溫

  @Expose()
  @IsOptional()
  @IsString()
  pulse?: string; // 脈搏

  @Expose()
  @IsOptional()
  @IsString()
  respiration?: string; // 呼吸

  @Expose()
  @IsOptional()
  @IsString()
  oxygenSaturation?: string; // 血氧飽和度

  @Expose()
  @IsOptional()
  @IsString()
  bloodPressureSYS?: string; // 血壓 SYS

  @Expose()
  @IsOptional()
  @IsString()
  bloodPressureDIA?: string; // 血壓 DIA

  @Expose()
  @IsOptional()
  @IsString()
  weight?: string; // 體重

  @Expose()
  @IsOptional()
  @IsString()
  epidemicNote?: string; // 備註

  @Expose()
  @IsOptional()
  @IsInt()
  consciousnessE?: number; // 清醒度 E

  @Expose()
  @IsOptional()
  @IsInt()
  consciousnessV?: number; // 清醒度 V

  @Expose()
  @IsOptional()
  @IsInt()
  consciousnessM?: number; // 清醒度 M

  @Expose()
  @IsOptional()
  @IsInt()
  computerGrade?: number; // 電腦化分級

  @Expose()
  @IsOptional()
  @IsInt()
  elderlyTriageGrade?: number; // 老年分級

  @Expose()
  @IsOptional()
  @IsInt()
  frailtyGrade?: number; // 衰弱指標

  @Expose()
  @IsOptional()
  @IsInt()
  modifiedGrade?: number; // 修正分級

  @Expose()
  @IsOptional()
  @IsString()
  modifiedGradeDescription?: string; // 修正分級描述

  @Expose()
  @IsOptional()
  @IsString()
  complaintEdit?: string; // 主訴編輯
}
