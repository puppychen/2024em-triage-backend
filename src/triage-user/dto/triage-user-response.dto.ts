// src/triage-user/dto/triage-user-response.dto.ts
import { BaseTriageUserDto } from './base-triage-user.dto';
import {
  EpidemicDataDto,
  FrailtyDataDto,
  PainDataDto,
  PastMedicalDataDto,
  SarcopeniaDataDto,
  SpecialCaseDataDto,
  TraumaDataDto,
} from './create-triage-user.dto';
import { Expose, Type } from 'class-transformer';

export class TriageUserResponseDto extends BaseTriageUserDto {
  @Expose({ name: 'TriageUserEpidemic' })
  @Type(() => EpidemicDataDto)
  epidemicData: EpidemicDataDto[];

  @Expose({ name: 'TriageUserSpecialCase' })
  @Type(() => SpecialCaseDataDto)
  specialCaseData: SpecialCaseDataDto[];

  @Expose({ name: 'TriageUserPastMedical' })
  @Type(() => PastMedicalDataDto)
  pastMedicalData: PastMedicalDataDto[];

  @Expose({ name: 'TriageUserTrauma' })
  @Type(() => TraumaDataDto)
  traumaData: TraumaDataDto[];

  @Expose({ name: 'TriageUserPain' })
  @Type(() => PainDataDto)
  painData: PainDataDto[];

  @Expose({ name: 'TriageUserSarcopenia' })
  @Type(() => SarcopeniaDataDto)
  sarcopeniaData: SarcopeniaDataDto[];

  @Expose({ name: 'TriageUserFrailty' })
  @Type(() => FrailtyDataDto)
  frailtyData: FrailtyDataDto[];
}
