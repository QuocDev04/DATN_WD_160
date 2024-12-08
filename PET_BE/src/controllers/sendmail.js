import 'dotenv/config';
import nodemailer from 'nodemailer';

const sendMail = async ({ email, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
            user: process.env.Mail_User,
            pass: process.env.Mail_Pass,
        },
    });
    const message = {
        from: process.env.Mail_User,
        to: email,
        subject: subject,
        html: html,
    };
    const result = await transporter.sendMail(message);
    return result;
};

export { sendMail };
