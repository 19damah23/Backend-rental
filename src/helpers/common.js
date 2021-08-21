const nodemailer = require('nodemailer')

const sendEmail = (toEmail, toName, token) => {
  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_VERIFICATION,
      pass: process.env.PASS_VERIFICATION
    }
  })

  transporter.sendMail({
    from: `"Vehicles Rental" <${process.env.EMAIL_VERIFICATION}>`,
    to: toEmail,
    subject: `Activation for ${toName}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title></title>
      </head>
      <body>
    <a href=${process.env.BASE_URL}/v1/auth/activation/${token}>Activate</a>
    </body>
    </html>`,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error)
  })
}

module.exports = {
  sendEmail
}