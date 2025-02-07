import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../../', '.env') });

@Injectable()
export class ConfigService {
  get(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  getDatabaseHost(): string {
    return this.get('DATABASE_HOST');
  }

  getEmailUser(): string {
    return this.get('EMAIL_USER');
  }

  getEmailPass(): string {
    return this.get('EMAIL_PASS');
  }
}