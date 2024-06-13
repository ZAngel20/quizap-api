import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as fs from 'fs';

import { emailConfig } from '../../config/email.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class EmailsenderService implements OnApplicationBootstrap {
  /*
   *  MAILS
   */

  async onApplicationBootstrap() {
    this.test = await this.getContentOf('test.html');
  }

  public test: string;

  /*
   *  FUNCIONS
   */

  private async getContentOf(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(`src/data/mails/${fileName}`, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async send(to: string, subject: string, body: string) {
    if (!emailConfig.enabled) {
      console.log('Envios de email deshabilitados');
      return true;
    }

    const arrayOfStrings = to.split('@');
    const arrayOfStrings2 = arrayOfStrings[0].split('+');
    to = arrayOfStrings2[0] + '@' + arrayOfStrings[1];

    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secured,
      auth: {
        user: emailConfig.username,
        pass: emailConfig.password,
      },
    });

    try {
      transporter.sendMail(
        {
          from: emailConfig.from,
          to,
          subject,
          html: body,
        },
        (error: any, info: any) => {
          console.log(error, info);
        },
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
