import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigService } from '../config.service';

@Module({
  providers: [MailService,ConfigService],
  controllers: [MailController],
  exports: [MailService],
})

export class MailModule {}
