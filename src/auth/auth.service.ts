import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegisterDto, VerifyContactDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { generateOtp } from 'src/utils/auth.utils';
import { OTP } from 'src/otp/otp.entity/otp.entity';
import { ContactType, TokenType } from 'src/utils/enum.utils';
import { MailService } from 'src/shared/services/mail/mail.service';
import { OtpService } from 'src/otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OTP)
    private readonly otpRepository: Repository<OTP>,

    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  async register(
    createRegisterDto: CreateRegisterDto,
  ): Promise<{ access_token: string; user: User }> {
    let email = createRegisterDto.email.trim().toLowerCase();
    // let phone = createRegisterDto.phone.trim().toLowerCase();

    try {
      const existingUser: User = await this.userRepository.findOne({
        where: {
          email: email,
          // phone: phone,
        },
      });

      if (existingUser) {
        throw new HttpException(
          'You already have an existing account, please login using your email address',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // find and validate the OTP

      const emailOtp = await this.otpRepository.findOne({
        where: {
          type: ContactType.Email,
          value: email,
          expiresAt: MoreThan(new Date()),
        },
      });

      if (!emailOtp) {
        throw new HttpException(
          'Invalid or expired email OTP',
          HttpStatus.BAD_REQUEST,
        );
      }

      // const smsOtp = await this.otpRepository.findOne({
      //   where: {
      //     type: ContactType.Phone,
      //     value: phone,
      //     expiresAt: MoreThan(new Date(Date.now())),
      //   },
      // });

      // if (!smsOtp) {
      //   throw new HttpException(
      //     'Invalid or expired phone OTP',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }

      const user = await this.userRepository.create(createRegisterDto);

      await this.userRepository.save(user);

      const payload = { id: user.id, role: user.role, type: TokenType.Auth };

      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '12hr',
        }),
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async initiateLogin(email: string) {
    email.trim().toLowerCase();

    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    const otp = this.otpService.generateOtp(6);

    await this.otpRepository.delete({ type: email, value: email });

    await this.otpRepository.create({
      user: { id: user.id },
      type: ContactType.Email,
      value: email,
      expiresAt: new Date(Date.now() + 60 * 1000),
    });

    await this.mailService.sendEmail({
      to: user.email,
      template: 'emailVerification',
      subject: 'generated OTP for you,',
      content: {
        name: `${user.firstName} ${user.lastName}`,
        Otp: otp,
      },
    });

    return {
      email: user.email,
      message: 'OTP has been sent to your email',
    };
  }

  async initiateContactVerification(type: string, value: string) {
    value = value.trim().toLowerCase();

    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          [type]: value,
        },
      });

      if (existingUser) {
        return {
          message:
            'You already have an existing account, please login using your email address',
        };
      }

      const generateOtp = this.otpService.generateOtp(6);

      await this.otpRepository.delete({
        type,
        value,
      });

      const savedOtp = await this.otpRepository.create({
        [type]: type,
        value: value,
        otp: generateOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });

      await this.otpRepository.save(savedOtp);

      if (type === ContactType.Email) {
        await this.mailService.sendEmail({
          to: value,
          template: 'emailVerification',
          subject: 'we have generated OTP.',
          content: {
            OTP: generateOtp,
          },
        });
      }

      if (type === ContactType.Phone) {
        // send otp to sms
      }

      return {
        generateOtp,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser() {
    try {
    } catch (error) {
      throw error;
    }
  }
}
