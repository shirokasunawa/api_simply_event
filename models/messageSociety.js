const mongoose = require('mongoose');



const messageSocietySchema = mongoose.Schema({
    idUserSociety : {type: mongoose.Schema.Types.ObjectId, ref: 'userSociety'},
    idConversation : {type: mongoose.Schema.Types.ObjectId, ref: 'conversation'},
    content :{ type: String, required: true },
    dateTime :{ type: String, required: true }
   
  })
  module.exports = mongoose.model('messagesocieties', messageSocietySchema);