const nodemailer = require('nodemailer');

const sendmail = async(email,message,sub)=>{
    try {
        let testaccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port:465,
            secure:true, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });
          const info = await transporter.sendMail({
            from: '"twisha khunt" <khunttwisha59@gmail.com>', // sender address
            to: email, // list of receivers
            subject: sub, // Subject line
            text:message, // plain text body
            html: `<b>${message}</b>`, // html body
          });

          console.log("Message sent: %s", info.messageId);
        return true
    } catch (error) {
        return false
    }
}

module.exports={
    sendmail
}