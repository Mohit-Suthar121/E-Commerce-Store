import nodemailer from 'nodemailer'

export const sendEmail = async (options)=>{

    const transporter = nodemailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },

    });

    const mailOptions = {
        from: `"SHORTCART Support" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
}