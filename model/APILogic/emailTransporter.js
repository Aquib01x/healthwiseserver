const { PASS } = require('../../config')

const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, 
    auth: {
        user: 'apikey', // This is the user SendGrid expects
        pass: PASS 
    },
    attachDataUrls: true,
  
});


module.exports = emailTransporter;
