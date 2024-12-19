const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    const info = await transporter.sendMail({
        from: '"Enzo Altamirano" <enzo.altamirano98@gmail.com>', // sender address
        to: "emilie.mohr28@ethereal.email", // list of receivers
        subject: "Test Email Sending", // Subject line
        html: "<h2>Sending emails with Node.js</h2>", // html body
      });

    res.json(info)
}

module.exports = sendEmail