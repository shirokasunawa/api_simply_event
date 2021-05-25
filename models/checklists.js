const mongoose = require('mongoose');

const checklistSchema = mongoose.Schema({
    titreCheclist : { type: String, required: false },
    productChecklist:{type: mongoose.Schema.Types.ObjectId, ref: 'products',required: false},
    created:{type: mongoose.Schema.Types.ObjectId, ref: 'event',required: false}
   
  })

  module.exports = mongoose.model('checklist', checklistSchema);