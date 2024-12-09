import { IsString, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BaseTriageUserDto } from './base-triage-user.dto';

export class EpidemicDataDto {
  @Expose() @IsOptional() @IsString() cough?: string;
  @Expose() @IsOptional() @IsString() contact?: string;
  @Expose() @IsOptional() @IsString() travel?: string;
}

export class SpecialCaseDataDto {
  @Expose() @IsOptional() @IsString() saveDate?: string;
  @Expose() @IsOptional() @IsInt() suicide?: boolean;
  @Expose() @IsOptional() @IsInt() drugAddiction?: boolean;
  @Expose() @IsOptional() @IsInt() domesticViolence?: boolean;
  @Expose() @IsOptional() @IsInt() infectiousDisease?: boolean;
  @Expose() @IsOptional() @IsInt() sexualAssault?: boolean;
  @Expose() @IsOptional() @IsInt() childAbuse?: boolean;
}

export class PastMedicalDataDto {
  @Expose() @IsOptional() @IsString() allergyHistory?: string;
  @Expose() @IsOptional() @IsString() bloodType?: string;
  @Expose() @IsOptional() @IsString() saveDate?: string;
  @Expose() @IsOptional() @IsString() additionalInfo?: string;
  @Expose() @IsOptional() @IsInt() noHistory?: boolean;
  @Expose() @IsOptional() @IsInt() unknownHistory?: boolean;
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  centralNervousSystemDiseases?: string[];
  @Expose() @IsOptional() @IsString({ each: true }) cardiacDiseases?: string[];
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  respiratoryDiseases?: string[];
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  digestiveDiseases?: string[];
  @Expose() @IsOptional() @IsString({ each: true }) urinaryDiseases?: string[];
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  metabolicDiseases?: string[];
  @Expose()
  @IsOptional()
  @Expose()
  @IsString({ each: true })
  cancerOrImmunodeficiencyDiseases?: string[];
}

export class TraumaDataDto {
  @Expose() @IsOptional() @IsString() injury?: string;
  @Expose() @IsOptional() @IsString() workplace?: string;
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  highRiskMechanisms?: string[];
}

export class PainDataDto {
  @Expose() @IsOptional() @IsString() level?: string;
}

export class SarcopeniaDataDto {
  @Expose() @IsOptional() @IsString() muscleStrength?: string;
  @Expose() @IsOptional() @IsString() walkingAssistance?: string;
  @Expose() @IsOptional() @IsString() gettingUp?: string;
  @Expose() @IsOptional() @IsString() climbingStairs?: string;
  @Expose() @IsOptional() @IsString() falling?: string;
}

export class FrailtyDataDto {
  @Expose() @IsOptional() @IsInt() score?: number;
}

export class CreateTriageUserDto extends BaseTriageUserDto {
  @ValidateNested() @Type(() => EpidemicDataDto) epidemicData: EpidemicDataDto;
  @ValidateNested()
  @Type(() => SpecialCaseDataDto)
  specialCaseData: SpecialCaseDataDto;
  @ValidateNested()
  @Type(() => PastMedicalDataDto)
  pastMedicalData: PastMedicalDataDto;
  @ValidateNested() @Type(() => TraumaDataDto) traumaData: TraumaDataDto;
  @ValidateNested() @Type(() => PainDataDto) painData: PainDataDto;
  @ValidateNested()
  @Type(() => SarcopeniaDataDto)
  sarcopeniaData: SarcopeniaDataDto;
  @ValidateNested() @Type(() => FrailtyDataDto) frailtyData: FrailtyDataDto;
}
