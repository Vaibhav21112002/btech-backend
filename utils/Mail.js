import nodemailer from 'nodemailer';

export const sendMail = (
    mailOptions,
    transporterOptions = {
        service: process.env.MAIL_SERVICE,
        user: process.env.MAIL_EMAILID,
        pass: process.env.MAIL_PASSWORD,
    }
) => {
    const transporter = nodemailer.createTransport({
        service: transporterOptions.service,
        auth: {
            user: transporterOptions.user,
            pass: transporterOptions.pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mail = {
        from: transporterOptions.user,
        to: mailOptions.to ? mailOptions.to : "",
        subject: mailOptions.subject ? mailOptions.subject : "",
        text: mailOptions.text ? mailOptions.text : "",
        html: mailOptions.html ? mailOptions.html : "",
    };

    transporter.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
            return error;
        }
        return info;
    });
};