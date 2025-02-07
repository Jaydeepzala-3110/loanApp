import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createAuthDto: CreateRegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async initiateLogin(@Body() email: string) {
    try {
      const response = await this.authService.initiateLogin(email);
      return {
        email: response.email,
        message: response.message,
      };
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/verify-contact')
  @HttpCode(HttpStatus.CREATED)
  async verifyContact(@Body() body: { type: string; value: string }) {
    const { type, value } = body;
    try {
      const response = await this.authService.initiateContactVerification(
        type,
        value,
      );
      return response;
    } catch (error) {
      // throw new HttpException(
      //   'Internal server error',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );

      throw error;
    }
  }
}
