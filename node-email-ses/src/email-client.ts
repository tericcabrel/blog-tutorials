import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';

type EmailClientArgs<TemplateData> = {
  to: string;
  subject: string;
  templatePath: string;
  templateData: TemplateData;
};

const sendMail = async <TemplateData>(data: EmailClientArgs<TemplateData>) => {
  const fromEmailAddress = process.env.FROM_EMAIL;
  const smtpHost = process.env.STMP_HOST ?? '';
  const smtpPort = parseInt(process.env.STMP_PORT ?? '587', 10);
  const smtpUser = process.env.STMP_USER ?? '';
  const smtpPassword = process.env.STMP_PASSWORD ?? '';

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
      from: `Awesome App <${fromEmailAddress}>`,
      subject: data.subject,
    };

    smtpTransport.sendMail(updatedData).then((result: nodemailer.SentMessageInfo): void => {
      console.info(result);
    });
  } catch (e) {
    console.error(e);
  }
};

export { sendMail };
