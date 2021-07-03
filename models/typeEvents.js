const mongoose = require('mongoose');

const typeEventSchema =mongoose.Schema({
    libelle: { type: String, required: false }
       
  })

  module.exports = mongoose.model('typeevents', typeEventSchema);