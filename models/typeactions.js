const mongoose = require('mongoose');

const typeactionsSchema = mongoose.Schema({
    titreAction : { type: String, required: false },
   _typeEvent : [{type: mongoose.Schema.Types.ObjectId, ref: 'typeEvents',required: false}]
   
  })

  module.exports = mongoose.model('typeactions', typeactionsSchema);