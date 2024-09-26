const Participant = require('../database/partecipantModel'); 
const App = require('../database/applicationModel'); 


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const QRCode = require('qrcode');
const  emailTransporter = require ('./emailTransporter');


const inviteParticipant = async (req, res) => {

    const { email, appId, user_email } = req.body;
    try {
        let participant = await Participant.findOne({email});
        const appUrl = `https://devweb2023.cis.strath.ac.uk/~fqb19176/healthwisecms/build/index.html#/mobile/${appId}`;

        const app = await App.findById(appId);

        const appName = app.name;

        
        if (!participant) {
            participant = new Participant({ email, appsInvitedTo: [appId,app.name],invitedBy:[user_email]});
        } else {
            if (!participant.appsInvitedTo.includes(appId)) {
                participant.appsInvitedTo.push(appId);
            }
            if (!participant.appsInvitedTo.includes(app.name)) {
                participant.appsInvitedTo.push(app.name);
            }
            if (!participant.invitedBy.includes(user_email)) {
                participant.invitedBy.push(user_email);
            }
        }
        await participant.save();

        // Generate QR code
        const qrCodeDataURL = await QRCode.toDataURL(appUrl);
        
        // Email content
        let mailOptions = {
            from: '"HealthwiseCMS-App Invitation" <healthwisecms@gmail.com>',
            to: email,
            subject: `You are Invited to the  ${appName}`,
            html: `
                <h1>App Invitation</h1>
                <p>You have been invited to use our app  ${appName}. Click the link below or scan the QR code to access it.</p>
                <p><a href="${appUrl}">Access the App</a></p>
                <img src="${qrCodeDataURL}" alt="App QR Code" style="width: 200px; height: 200px;"/>
            `
        };

        // Send the email
        emailTransporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(500).send({ message: "Error sending email invitation", error: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).send({ message: "Participant invited successfully and email sent." });
            }
        });
    } catch (error) {
        res.status(500).send({ message: "Error inviting participant", error: error.message });
    }
};




const getParticipants = async (req, res) => {


  const { invitedBy } = req.query;
  try {
    const participants = invitedBy
      ? await Participant.find({ "invitedBy": invitedBy })
      : await Participant.find();
    res.json(participants);
  } catch (error) {
    res.status(500).send(error);
  }


};


module.exports = {
    inviteParticipant,
    getParticipants,
 
  
  }