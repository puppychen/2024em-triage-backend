import {
  IsString,
  IsInt,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseTriageUserDto } from './base-triage-user.dto';

class EpidemicDataDto {
  @IsOptional() @IsString() cough?: string;
  @IsOptional() @IsString() contact?: string;
  @IsOptional() @IsString() travel?: string;
}

class SpecialCaseDataDto {
  @IsOptional() @IsString() saveDate?: string;
  @IsOptional() @IsInt() suicide?: boolean;
  @IsOptional() @IsInt() drugAddiction?: boolean;
  @IsOptional() @IsInt() domesticViolence?: boolean;
  @IsOptional() @IsInt() infectiousDisease?: boolean;
  @IsOptional() @IsInt() sexualAssault?: boolean;
  @IsOptional() @IsInt() childAbuse?: boolean;
}

class PastMedicalDataDto {
  @IsOptional() @IsString() allergyHistory?: string;
  @IsOptional() @IsString() bloodType?: string;
  @IsOptional() @IsString() saveDate?: string;
  @IsOptional() @IsString() additionalInfo?: string;
  @IsOptional() @IsInt() noHistory?: boolean;
  @IsOptional() @IsInt() unknownHistory?: boolean;
  @IsOptional()
  @IsString({ each: true })
  centralNervousSystemDiseases?: string[];
  @IsOptional() @IsString({ each: true }) cardiacDiseases?: string[];
  @IsOptional() @IsString({ each: true }) respiratoryDiseases?: string[];
  @IsOptional() @IsString({ each: true }) digestiveDiseases?: string[];
  @IsOptional() @IsString({ each: true }) urinaryDiseases?: string[];
  @IsOptional() @IsString({ each: true }) metabolicDiseases?: string[];
  @IsOptional()
  @IsString({ each: true })
  cancerOrImmunodeficiencyDiseases?: string[];
}

class TraumaDataDto {
  @IsOptional() @IsString() injury?: string;
  @IsOptional() @IsString() workplace?: string;
  @IsOptional() @IsString({ each: true }) highRiskMechanisms?: string[];
}

class PainDataDto {
  @IsOptional() @IsString() level?: string;
}

class SarcopeniaDataDto {
  @IsOptional() @IsString() muscleStrength?: string;
  @IsOptional() @IsString() walkingAssistance?: string;
  @IsOptional() @IsString() gettingUp?: string;
  @IsOptional() @IsString() climbingStairs?: string;
  @IsOptional() @IsString() falling?: string;
}

class FrailtyDataDto {
  @IsOptional() @IsInt() score?: number;
}

export class CreateTriageUserDto extends BaseTriageUserDto {
  @ValidateNested() @Type(() => EpidemicDataDto) epidemicData: EpidemicDataDto;
  @ValidateNested() @Type(() => SpecialCaseDataDto) specialCaseData: SpecialCaseDataDto;
  @ValidateNested() @Type(() => PastMedicalDataDto) pastMedicalData: PastMedicalDataDto;
  @ValidateNested() @Type(() => TraumaDataDto) traumaData: TraumaDataDto;
  @ValidateNested() @Type(() => PainDataDto) painData: PainDataDto;
  @ValidateNested() @Type(() => SarcopeniaDataDto) sarcopeniaData: SarcopeniaDataDto;
  @ValidateNested() @Type(() => FrailtyDataDto) frailtyData: FrailtyDataDto;
}
