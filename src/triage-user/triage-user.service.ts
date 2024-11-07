import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTriageUserDto, UpdateTriageUserDto } from './dto';

@Injectable()
export class TriageUserService {
  constructor(private prisma: PrismaService) {}

  async create(createTriageUserDto: CreateTriageUserDto, userUuid: string) {
    const groupId = await this.getGroupIdByUser(userUuid); // 取得使用者的 groupId
    const {
      epidemicData,
      specialCaseData,
      pastMedicalData,
      traumaData,
      painData,
      sarcopeniaData,
      frailtyData,
      ...rest
    } = createTriageUserDto;
    return this.prisma.triageUser.create({
      data: {
        ...rest,
        groupId,
        registrationDate: new Date(createTriageUserDto.registrationDate),
        birthdate: new Date(createTriageUserDto.birthdate),
        TriageUserEpidemic: {
          create: createTriageUserDto.epidemicData,
        },
        TriageUserSpecialCase: {
          create: createTriageUserDto.specialCaseData,
        },
        TriageUserPastMedical: {
          create: createTriageUserDto.pastMedicalData,
        },
        TriageUserTrauma: {
          create: createTriageUserDto.traumaData,
        },
        TriageUserPain: {
          create: createTriageUserDto.painData,
        },
        TriageUserSarcopenia: {
          create: createTriageUserDto.sarcopeniaData,
        },
        TriageUserFrailty: {
          create: createTriageUserDto.frailtyData,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.triageUser.findMany();
  }

  async findOne(id: number) {
    return this.prisma.triageUser.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTriageUserDto: UpdateTriageUserDto) {
    return this.prisma.triageUser.update({
      where: { id },
      data: updateTriageUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.triageUser.delete({
      where: { id },
    });
  }

  private async getGroupIdByUser(adminUuid: string): Promise<number> {
    const admin = await this.prisma.admin.findUnique({
      where: { uuid: adminUuid },
    });

    if (!admin || !admin.groupId) {
      throw new UnauthorizedException('User does not belong to a group');
    }

    return admin.groupId;
  }
}
