const mongoose = require('mongoose');



const conversationSchema = mongoose.Schema({
    _idUserClient : {type: mongoose.Schema.Types.ObjectId, ref: 'userClient'},
    _idUserSociety : {type: mongoose.Schema.Types.ObjectId, ref: 'userSociety'},
    _product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    _messagesClient : [{type: mongoose.Schema.Types.ObjectId, ref: 'messageClient'}],
    _messagesSociety : [{type: mongoose.Schema.Types.ObjectId, ref: 'messageSociety'}],
  })
  module.exports = mongoose.model('conversation', conversationSchema);