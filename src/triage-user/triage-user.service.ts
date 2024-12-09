import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTriageUserDto, UpdateTriageUserDto } from './dto';
import { SearchTriageUserDto } from './dto/search-triage-user.dto';
import { SearchEpidemicTriageUserDto } from './dto/search-epidemic-triage-user.dto';
import { SearchSpecialCaseTriageUserDto } from './dto/search-special-case-triage-user.dto';

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
          create: epidemicData,
        },
        TriageUserSpecialCase: {
          create: specialCaseData,
        },
        TriageUserPastMedical: {
          create: pastMedicalData,
        },
        TriageUserTrauma: {
          create: traumaData,
        },
        TriageUserPain: {
          create: painData,
        },
        TriageUserSarcopenia: {
          create: sarcopeniaData,
        },
        TriageUserFrailty: {
          create: frailtyData,
        },
      },
    });
  }

  async findAll(body: SearchTriageUserDto, userUuid: string, userRole: string) {
    const {
      dateType = 'createdAt',
      startDate,
      endDate,
      medicalRecordNumber,
      deptId,
      arrivalMethod,
      grade,
    } = body;

    const where: any = {};

    if (startDate && endDate) {
      where[dateType === 'registration' ? 'registrationDate' : 'createdAt'] = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (medicalRecordNumber) {
      where.medicalRecordNumber = {
        contains: medicalRecordNumber,
      };
    }

    if (deptId) {
      where.deptId = deptId;
    }

    if (arrivalMethod) {
      where.arrivalMethod = arrivalMethod;
    }

    if (grade) {
      where.OR = [
        { grade },
        { modifiedGrade: grade },
        { computerGrade: grade },
      ];
    }

    if (userRole === 'admin' || userRole === 'user') {
      const user = await this.prisma.admin.findUnique({
        where: { uuid: userUuid },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid user UUID');
      }
      where.groupId = user.groupId;
    }

    return this.prisma.triageUser.findMany({
      where,
      include: { group: true, dept: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllEpidemic(
    body: SearchEpidemicTriageUserDto,
    userUuid: string,
    userRole: string,
  ) {
    const {
      dateType = 'createdAt',
      startDate,
      endDate,
      medicalRecordNumber,
      deptId,
      arrivalMethod,
      grade,
      cough,
      contact,
      travel,
    } = body;

    const where: any = {};

    if (startDate && endDate) {
      where[dateType === 'registration' ? 'registrationDate' : 'createdAt'] = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (medicalRecordNumber) {
      where.medicalRecordNumber = {
        contains: medicalRecordNumber,
      };
    }

    if (deptId) {
      where.deptId = deptId;
    }

    if (arrivalMethod) {
      where.arrivalMethod = arrivalMethod;
    }

    if (grade) {
      where.OR = [
        { grade },
        { modifiedGrade: grade },
        { computerGrade: grade },
      ];
    }

    if (userRole === 'admin' || userRole === 'user') {
      const user = await this.prisma.admin.findUnique({
        where: { uuid: userUuid },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid user UUID');
      }
      where.groupId = user.groupId;
    }

    if (cough || contact || travel) {
      where.TriageUserEpidemic = {
        some: {
          ...(cough && { cough }),
          ...(contact && { contact }),
          ...(travel && { travel }),
        },
      };
    } else {
      where.TriageUserEpidemic = {
        some: {
          OR: [
            { cough: { not: '' } },
            { contact: { not: '' } },
            { travel: { not: '' } },
          ],
        },
      };
    }

    return this.prisma.triageUser.findMany({
      where,
      include: {
        group: true,
        dept: true,
        TriageUserEpidemic: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllSpecialCase(
    body: SearchSpecialCaseTriageUserDto,
    userUuid: string,
    userRole: string,
  ) {
    const {
      dateType = 'createdAt',
      startDate,
      endDate,
      medicalRecordNumber,
      deptId,
      reportDate,
      suicide,
      drugAddiction,
      domesticViolence,
      infectiousDisease,
      sexualAssault,
      childAbuse,
    } = body;

    const where: any = {};

    if (startDate && endDate) {
      where[dateType === 'registration' ? 'registrationDate' : 'createdAt'] = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (medicalRecordNumber) {
      where.medicalRecordNumber = {
        contains: medicalRecordNumber,
      };
    }

    if (deptId) {
      where.deptId = deptId;
    }

    if (userRole === 'admin' || userRole === 'user') {
      const user = await this.prisma.admin.findUnique({
        where: { uuid: userUuid },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid user UUID');
      }
      where.groupId = user.groupId;
    }

    where.TriageUserSpecialCase = {
      some: {
        ...(reportDate && { saveDate: new Date(reportDate) }),
        ...(suicide !== false && { suicide }),
        ...(drugAddiction !== false && { drugAddiction }),
        ...(domesticViolence !== false && { domesticViolence }),
        ...(infectiousDisease !== false && { infectiousDisease }),
        ...(sexualAssault !== false && { sexualAssault }),
        ...(childAbuse !== false && { childAbuse }),
      },
    };

    return this.prisma.triageUser.findMany({
      where,
      include: {
        group: true,
        dept: true,
        TriageUserSpecialCase: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.triageUser.findUnique({
      where: { id },
      include: {
        TriageUserEpidemic: true,
        TriageUserSpecialCase: true,
        TriageUserPastMedical: true,
        TriageUserTrauma: true,
        TriageUserPain: true,
        TriageUserSarcopenia: true,
        TriageUserFrailty: true,
      },
    });
  }

  async update(id: number, updateTriageUserDto: UpdateTriageUserDto) {
    const {
      epidemicData,
      specialCaseData,
      pastMedicalData,
      traumaData,
      painData,
      sarcopeniaData,
      frailtyData,
      ...rest
    } = updateTriageUserDto;

    const triageUser = await this.prisma.triageUser.findUnique({
      where: { id },
      include: {
        TriageUserEpidemic: true,
        TriageUserSpecialCase: true,
        TriageUserPastMedical: true,
        TriageUserTrauma: true,
        TriageUserPain: true,
        TriageUserSarcopenia: true,
        TriageUserFrailty: true,
      },
    });
    await this.prisma.triageUserEpidemic.update({
      where: { id: triageUser.TriageUserEpidemic[0]?.id },
      data: epidemicData[0],
    });
    await this.prisma.triageUserSpecialCase.update({
      where: { id: triageUser.TriageUserSpecialCase[0]?.id },
      data: specialCaseData[0],
    });
    console.log(pastMedicalData[0]);
    await this.prisma.triageUserPastMedical.update({
      where: { id: triageUser.TriageUserPastMedical[0]?.id },
      data: pastMedicalData[0],
    });
    await this.prisma.triageUserTrauma.update({
      where: { id: triageUser.TriageUserTrauma[0]?.id },
      data: traumaData[0],
    });
    await this.prisma.triageUserPain.update({
      where: { id: triageUser.TriageUserPain[0]?.id },
      data: painData[0],
    });
    await this.prisma.triageUserSarcopenia.update({
      where: { id: triageUser.TriageUserSarcopenia[0]?.id },
      data: sarcopeniaData[0],
    });
    await this.prisma.triageUserFrailty.update({
      where: { id: triageUser.TriageUserFrailty[0]?.id },
      data: frailtyData[0],
    });

    return this.prisma.triageUser.update({
      where: { id },
      data: {
        ...rest,
        registrationDate: new Date(updateTriageUserDto.registrationDate),
        birthdate: new Date(updateTriageUserDto.birthdate),
      },
    });
  }

  async countTriageUsers(
    body: { start_date?: string; end_date?: string },
    userUuid: string,
    userRole: string,
  ) {
    let { start_date, end_date } = body;

    if (!start_date || !end_date) {
      const now = new Date();
      end_date = end_date || now.toISOString();
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
      start_date = start_date || lastMonth.toISOString();
    }

    const where: any = {
      createdAt: {
        gte: new Date(start_date),
        lte: new Date(end_date),
      },
    };

    if (userRole === 'admin' || userRole === 'user') {
      const user = await this.prisma.admin.findUnique({
        where: { uuid: userUuid },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid user UUID');
      }
      where.groupId = user.groupId;
    }

    const triageUsers = await this.prisma.triageUser.findMany({
      where,
      select: {
        computerGrade: true,
        frailtyGrade: true,
        birthdate: true,
      },
    });

    const ageGroups = {
      '1 below': 0,
      '1-12': 0,
      '13-40': 0,
      '40-50': 0,
      '50-65': 0,
      '65 above': 0,
      unknown: 0,
    };

    const gradesCount = {
      1: { ...ageGroups, total: 0 },
      2: { ...ageGroups, total: 0 },
      3: { ...ageGroups, total: 0 },
      4: { ...ageGroups, total: 0 },
      5: { ...ageGroups, total: 0 },
      total: 0,
    };

    const frailtyCount = {
      1: { ...ageGroups, total: 0 },
      2: { ...ageGroups, total: 0 },
      3: { ...ageGroups, total: 0 },
      4: { ...ageGroups, total: 0 },
      5: { ...ageGroups, total: 0 },
      total: 0,
    };

    const getAge = (birthdate: Date) => {
      const ageDifMs = Date.now() - new Date(birthdate).getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    triageUsers.forEach((user) => {
      let ageGroup = 'unknown';
      if (user.birthdate) {
        const age = getAge(user.birthdate);
        if (age < 1) ageGroup = '1 below';
        else if (age <= 12) ageGroup = '1-12';
        else if (age <= 40) ageGroup = '13-40';
        else if (age <= 50) ageGroup = '40-50';
        else if (age <= 65) ageGroup = '50-65';
        else ageGroup = '65 above';
      }

      if (user.computerGrade >= 1 && user.computerGrade <= 5) {
        gradesCount[user.computerGrade][ageGroup]++;
        gradesCount[user.computerGrade].total++;
        gradesCount.total++;
      }

      if (user.frailtyGrade >= 1 && user.frailtyGrade <= 5) {
        frailtyCount[user.frailtyGrade][ageGroup]++;
        frailtyCount[user.frailtyGrade].total++;
        frailtyCount.total++;
      }
    });

    return { computer: gradesCount, frailty: frailtyCount };
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
