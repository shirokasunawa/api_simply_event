const mongoose = require('mongoose');



const messageClientSchema = mongoose.Schema({
    idUserClient : {type: mongoose.Schema.Types.ObjectId, ref: 'userClient'},
    idConversation : {type: mongoose.Schema.Types.ObjectId, ref: 'conversation'},
    content :{ type: String, required: true },
    dateTime :{ type: String, required: true }
   
  })
  module.exports = mongoose.model('messageclient', messageClientSchema);