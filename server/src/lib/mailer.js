import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from './logger.js';

const transporter = env.SMTP_HOST
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    })
  : null;

export const sendPasswordResetMail = async (to, resetUrl) => {
  if (!transporter) {
    logger.info({ to, resetUrl }, 'SMTP is not configured, skipping password reset mail');
    return;
  }

  await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject: 'Stack Diet şifre sıfırlama',
    text: `Şifrenizi sıfırlamak için aşağıdaki bağlantıyı kullanın. Bağlantı 1 saat boyunca geçerlidir.\n\n${resetUrl}\n\nBu isteği siz yapmadıysanız bu e-postayı dikkate almayın.`,
  });
};
