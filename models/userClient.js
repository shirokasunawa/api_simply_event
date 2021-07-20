const mongoose = require('mongoose');





const userClientSchema = mongoose.Schema({
  nom: { type: String, required: true },
   role: { type: String, required: true },
   adresseMail: { type: String, required: true },
   login: { type: String, required: false },
   password: { type: String, required: true },
   _events:[{type: mongoose.Schema.Types.ObjectId, ref: 'events'}],
   _conversation : [{type: mongoose.Schema.Types.ObjectId, ref: 'conversation'}]
});



module.exports = mongoose.model('userClient', userClientSchema);