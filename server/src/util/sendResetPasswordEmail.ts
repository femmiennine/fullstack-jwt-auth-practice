//install nodemailer and types/nodemailer
import nodemailer from 'nodemailer';
import dev from '../config/index';

export const sendResetPasswordEmail = async (name: string, email: string, token: string) => {
  console.log(email);
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: dev.app.auth_email,
        pass: dev.app.auth_password,
      },
    });

    const mailOptions = {
      from: dev.app.auth_email,
      to: email,
      subject: 'Reset Account Password Link',
      html: `<p>Please click the link below to reset your password</p> <b/> 
            <a href="http://localhost:3000/reset-password?token=${token}"> Please reset your password </a>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
