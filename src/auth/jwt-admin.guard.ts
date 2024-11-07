import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JwtAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtService.verify(token);
      const admin = await this.prisma.admin.findUnique({
        where: { uuid: payload.sub },
      });

      if (!admin || admin.role !== payload.role) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = admin;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}