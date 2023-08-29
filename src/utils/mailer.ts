import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_SENDER as string,
    pass: process.env.MAIL_PASSWORD as string,
  },
});

const Mailer = {
  send: async ({
    to,
    subject,
    firstName,
    orderId,
    province,
    city,
    price,
    orderLink,
  }: {
    to: string;
    subject: string;
    firstName: string;
    orderId: string;
    province: string;
    city: string;
    orderLink: string;
    price: number;
  }) => {
    const source = fs.readFileSync('./email_template.html', 'utf-8').toString();

    const emailTemplate = handlebars.compile(source);

    const values = {
      firstName,
      orderId,
      province,
      city,
      price: price && price / 100,
      orderLink,
    };

    const htmlBodyToSend = emailTemplate(values);

    let mailOptions = {
      from: process.env.MAIL_SENDER as string,
      to,
      subject,
      html: htmlBodyToSend,
    };

    try {
      await mailTransporter.sendMail(mailOptions);
    } catch (e) {
      await Promise.reject(new Error(`Error sending mail(s) to ${to} - ${e}`));
    }
  },
};

export default Mailer;
