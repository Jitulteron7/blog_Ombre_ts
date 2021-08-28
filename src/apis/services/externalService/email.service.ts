import nodemailer from 'nodemailer';

class MailService {
    transpoter: any;
    constructor() {
        this.transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.PASSWORD
            }
        });
    }

    async sendForgotPasswordMail(user: any, token: string) {
        const resetLink = `${process.env.FRONTEND_DOMAIN_NAME}/resetpassword/${user._id}/${token}`;
        const mailOptions = {
            from: process.env.FROM_EMAIL as string,
            to: user.email,
            subject: 'Password Email Link',
            text: `Click on this link to reset password: ${resetLink}`,
            html: `Click on this link to reset password: ${resetLink}`
        };

        await this.transpoter.sendMail(mailOptions);
    }
}

export default MailService;
