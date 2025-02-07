import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OtpService } from 'src/otp/otp.service';
import { MailService } from 'src/shared/services/mail/mail.service';
import { OtpModule } from 'src/otp/otp.module';
import { OTP } from 'src/otp/otp.entity/otp.entity';
import { ConfigService } from 'src/shared/services/config.service';
import { OtpService } from 'src/otp/otp.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, OTP])],
  controllers: [AuthController],
  providers: [AuthService, MailService, ConfigService, OtpService, JwtService],
})
export class AuthModule {}
