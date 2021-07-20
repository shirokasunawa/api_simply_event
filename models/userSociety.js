const mongoose = require('mongoose');



const userSocietySchema = mongoose.Schema({
    nameUser : { type: String, required: true },
    roleUser : { type: String, required: true },
    addressMail : { type: String, required: true },
    addressSociety : { type: String, required: true },
    login :{ type: String, required: false },
    password:{ type: String, required: true },
    nameSociety :{ type: String, required: true },
    tokenPayment : { type: String, required: false },
    _products : [{type: mongoose.Schema.Types.ObjectId, ref: 'products'}],
    _pubs : [{type: mongoose.Schema.Types.ObjectId, ref: 'pub'}],
    _conversation : [{type: mongoose.Schema.Types.ObjectId, ref: 'conversation'}]
  })
  module.exports = mongoose.model('userSociety', userSocietySchema);