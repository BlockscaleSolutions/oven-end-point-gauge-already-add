const log = require("../logger");
const nodemailer = require("nodemailer");

// sendEmailNotifications([ 'adamjlemmon@gmail.com' ]);

/**
 * Send email notificaitons.
 * @param {Array} email array of emails to notify.
 */
async function sendEmailNotifications(emails) {
    log.info({ module: "eth" }, `Notifying donors: ${emails}`);

    for (let i = 0; i < emails.length; i += 1) {
        await sendEmail(emails[i]);
    }
}

async function sendEmail(email) {
    // send mail with defined transport object
    return new Promise(async (resolve, reject) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "adamjlemmon@gmail.com",
                pass: process.env.MAIL_PASS
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: "<noreply@blockscalesolutions.com>", // sender address
            to: email, // list of receivers
            subject: "Your donation has been spent!", // Subject line
            text: `Hi and thanks so much for your donation. \nWe are pleased to inform you that is was just recently accessed. \nTOOD tx details`
            // html: '<b>Important</b>' // html body
        };

        resolve(await send(transporter, mailOptions));
    });
}

function send(transporter, mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // FIXME not mission critical so with just log for now
                log.error(
                    { module: "mailer" },
                    `Error sending email: ${error.message}`
                );
            } else {
                log.info(
                    { module: "mailer" },
                    `Message ${info.messageId} sent: ${info.response}`
                );
            }
            resolve();
        });
    });
}

module.exports = sendEmailNotifications;
