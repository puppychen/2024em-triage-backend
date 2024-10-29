import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './group/group.module';
import { AdminModule } from './admin/admin.module';
import { DeptService } from './dept/dept.service';
import { DeptController } from './dept/dept.controller';
import { DeptModule } from './dept/dept.module';
import { TriageUserModule } from './triage-user/triage-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    AuthModule,
    DeptModule,
    GroupModule,
    TriageUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
