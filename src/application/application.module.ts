import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Application } from './entities/application.entity';
import { User } from 'src/user/entities/user.entity';
import { Employement } from 'src/user/entities/employment.entity';
import {
  DrivingLicense,
  Identity,
  Medicare,
  Passport,
} from 'src/user/entities/identity.entity';
import { Expenses } from 'src/user/entities/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Application,
      Employement,
      Identity,
      Expenses,
      Medicare,
      Passport,
      DrivingLicense,
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, JwtService],
})
export class ApplicationModule {}
