//install nodemailer and types/nodemailer
import nodemailer from 'nodemailer';
import dev from '../config/index';

export const sendVerificationEmail = async (email: string, name: string, _id: any) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: dev.app.auth_email,
        pass: dev.app.auth_password,
      },
    });

    const mailOptions = {
      from: dev.app.auth_email, // sender address
      to: email, // list of receivers
      subject: 'Verification Email', // Subject line
      // text: "Hello world?", // plain text body
      html: `<p> Welcome ${name}! <a href="http://localhost:3000/verify-user/${_id}"> Click for email verification </a> </p>`, //HTML body
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
