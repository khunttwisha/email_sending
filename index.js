require('dotenv').config();
const express = require('express');
const {sendmail}=require("./sendmail/sendmail");

const app = express();

app.use(express.json());

// console.log(process.env.EMAIL_USER); 
// console.log(process.env.EMAIL_PASS);

// const gmailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const customTransporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false, 
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//     }
// });

// app.post('/send-email-gmail', async (req, res) => {
//     let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: req.body.to,
//         subject: req.body.subject,
//         text: req.body.text,
//         html: req.body.html
//     };

//     try {
//         let info = await gmailTransporter.sendMail(mailOptions);
//         console.log('Email sent via Gmail: ' + info.response);
//         res.send('Email sent successfully via Gmail');
//     } catch (error) {
//         console.error('Error sending email via Gmail:', error);
//         res.status(500).send('Error sending email via Gmail');
//     }
// });

// app.post('/send-email-custom', async (req, res) => {
//     let mailOptions = {
//         from: process.env.SMTP_USER,
//         to: req.body.to,
//         subject: req.body.subject,
//         text: req.body.text,
//         html: req.body.html
//     };

//     try {
//         let info = await customTransporter.sendMail(mailOptions);
//         console.log('Email sent via Custom SMTP: ' + info.response);
//         res.send('Email sent successfully via Custom SMTP');
//     } catch (error) {
//         console.error('Error sending email via Custom SMTP:', error);
//         res.status(500).send('Error sending email via Custom SMTP');
//     }
// });

app.post("/sendmail",async(req,res)=>{
    const ismailsent = await sendmail(req.body.email,"hello","test");

    if(ismailsent){
        res.status(200).json({
            sucess:true,
            message:"mail sent sucessfully"
        })
    }else{
        return res.status(400).json({
            sucess:false,
            message:"mail sent error"
        })
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
