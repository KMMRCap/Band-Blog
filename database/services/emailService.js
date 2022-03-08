import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})



export const contactEmail = async (data) => {
    try {
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Smelly cats",
                link: "http://smelly_cats.com"
            }
        });

        const email = {
            body: {
                name: 'Admin',
                intro: [
                    'Hey !! someone contacted you from our app',
                    `From:  ${data.email}`,
                    `Name:  ${data.name}`,
                    `Message:  ${data.message}`
                ],
                outro: 'Bye !!'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: data.email,
            to: process.env.EMAIL_USER,
            subject: "Contacted received",
            html: emailBody
        };

        await transporter.sendMail(message);
        return true;
    } catch (error) {
        throw error;
    }
}
