import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './shared/services/database.service';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './shared/services/mail/mail.service';
import { MailController } from './shared/services/mail/mail.controller';
import { MailModule } from './shared/services/mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { ConfigService } from './shared/services/config.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UserModule,
    ApplicationModule,
    AuthModule,
    MailModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, JwtService],
  exports: [ConfigService],
})
export class AppModule {}
