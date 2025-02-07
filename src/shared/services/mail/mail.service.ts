import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { createTransport, Transporter } from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { ConfigService } from '../config.service';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.getEmailUser(),
        pass: this.configService.getEmailPass(),
      },
    });
  }

  private async loadTemplate(templateName: string, content: any) {
    const templatePath = path.join(
      process.cwd(),
      './src/shared/services/templates/',
      `${templateName}.hbs`,
    );

    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template: any = handlebars.compile(templateSource);
    return template(content);
  }

  async sendEmail({ to, template, subject, content }) {
    const html = await this.loadTemplate(template, content);

    try {
      const info = await this.transporter.sendMail({
        from: this.configService.getEmailUser(),
        to: to,
        subject: subject,
        text: JSON.stringify(content),
        html: html,
      });

      console.log('email sent', info.response);
    } catch (error) {
      throw error;
    }
  }
}
