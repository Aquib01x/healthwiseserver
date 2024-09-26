
const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({

  email: { type: String, required: true, unique: true },
  appsInvitedTo: [{ type: mongoose.Schema.Types.Mixed, ref: 'App' }],
  invitedBy: [{ type: mongoose.Schema.Types.Mixed, ref: 'User' }] 
  
});

module.exports = mongoose.model('Participant', participantSchema);
