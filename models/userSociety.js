const mongoose = require('mongoose');



const userSocietySchema = mongoose.Schema({
    nameUser : { type: String, required: true },
    roleUser : { type: String, required: true },
    addressMail : { type: String, required: true },
    addressSociety : { type: String, required: true },
    login :{ type: String, required: false },
    password:{ type: String, required: true },
    nameSociety :{ type: String, required: true },
    _products : [{type: mongoose.Schema.Types.ObjectId, ref: 'products'}]
  })
  module.exports = mongoose.model('userSociety', userSocietySchema);