import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OTP } from './otp.entity/otp.entity';
import { generateOtp } from 'src/utils/auth.utils';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OTP)
    private readonly otpRepository: Repository<OTP>,
  ) {}

  generateOtp(length: number = 6) {
    let otp = '';

    for (let i = 1; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    return otp;
  }
}
