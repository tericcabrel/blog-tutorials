import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as Mail from "nodemailer/lib/mailer";

type EmailClientArgs<TemplateData> = {
  to: string;
  subject: string;
  templatePath: string;
  templateData: TemplateData;
};

const sendEmail = async <TemplateData>(data: EmailClientArgs<TemplateData>) => {
  const fromEmailAddress = process.env.FROM_EMAIL;
  const smtpHost = process.env.SMTP_HOST ?? '';
  const smtpPort = parseInt(process.env.SMTP_PORT ?? '587', 10);
  const smtpUser = process.env.SMTP_USER ?? '';
  const smtpPassword = process.env.SMTP_PASSWORD ?? '';

  try {
    const smtpTransport: Mail = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const source = fs.readFileSync(data.templatePath, { encoding: 'utf-8' });
    const template: HandlebarsTemplateDelegate<TemplateData> = handlebars.compile(source);
    const html: string = template(data.templateData);

    const updatedData: Mail.Options = {
      to: data.to,
      html,
      from: `Ecommerce App <${fromEmailAddress}>`,
      subject: data.subject,
    };

    console.log('Sending email...');
    await smtpTransport.sendMail(updatedData);
    console.log('Email sent successfully');
  } catch (e) {
    console.error('Error sending email');
    console.error(e);
  }
};

export { sendEmail };