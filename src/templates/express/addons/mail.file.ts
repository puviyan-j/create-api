import type { Language, Module } from '../../../types/answers.js';
import fs from 'fs-extra';

function createMailService(module: Module, language: Language) {
  return `
${language === 'typescript' ? 'import  type { Transporter } from "nodemailer";' : ''}
${module === 'modulejs' ? 'import { transporter } from "./transporter.js";' : 'const { transporter } = require("./transporter");'}

class MailService {

    ${
      language === 'typescript'
        ? 'constructor(private transporter: Transporter) { }'
        : `constructor(transporter) {
        this.transporter = transporter;
    }`
    }

    async sendOtp(${language === 'typescript' ? 'email: string, otp: string' : 'email, otp'}) {
        return this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: "OTP Verification",
            html: \`<h2>Your OTP is \${otp}</h2>\`,
        });
    }
}

${module === 'modulejs' ? 'export const mailService = new MailService(mailtransporter)' : 'exports.mailService = new MailService(mailtransporter)'};

`;
}

function createTransporter(module: Module, language: Language) {
  return `
${module === 'modulejs' ? `import nodemailer${language === 'typescript' ? ', { type Transporter }' : ''} from "nodemailer"` : "const nodemailer = require('nodemailer')"}

${
  module === 'modulejs'
    ? `export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});`
    : ''
}

${module === 'commonjs' ? 'module.exports = { transporter }' : ''}
`;
}

export async function mailService(module: Module, language: Language) {
  const transporter = createTransporter(module, language);
  const mailservice = createMailService(module, language);

  const ext = language === 'typescript' ? '.ts' : '.js';

  const transporterpath = `src/infrastructure/mail/transporter${ext}`;
  const mailservicepath = `src/infrastructure/mail/mail.service${ext}`;

  const transporterfile = await fs.exists(transporterpath);
  const mailservicefile = await fs.exists(mailservicepath);

  if (transporterfile || mailservicefile) {
    console.log('mail already exists');
    return;
  }

  if (!transporterfile) {
    await fs.ensureFile(transporterpath);
    await fs.writeFile(transporterpath, transporter);
  }

  if (!mailservicefile) {
    await fs.ensureFile(mailservicepath);
    await fs.writeFile(mailservicepath, mailservice);
  }
}
