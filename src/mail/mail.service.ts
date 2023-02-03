import { MailerService } from '@nestjs-modules/mailer/dist';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    // async sendUserConfirmationEmail(user: Partial<User>, token: string) {
    //     const url = `example.com/auth/confirm?token=${token}`;

    //     await this.mailerService.sendMail({
    //         to: user.email,
    //         // from: '"Support Team" <support@example.com>', // override default from
    //         subject: 'Welcome to Nice App! Confirm your Email',
    //         template: './confirmation', // `.hbs` extension is appended automatically
    //         context: { // ✏️ filling curly brackets with content
    //           name: user.firstName,
    //           url,
    //         },
    //       });
    // }

    async sendUserConfirmationEmail(user: Partial<User>, token: string, url: string) {
      await this.mailerService.sendMail({
        to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
              name: user.firstName,
              url,
            },
      })
    }
}
