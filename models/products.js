const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    typeProduct : { type: String, required: false },
   priceProduct : { type: Number, required: false },
   seller: {type: mongoose.Schema.Types.ObjectId, ref: 'userSociety'}
  })

  module.exports = mongoose.model('products', productsSchema);