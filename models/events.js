const mongoose = require('mongoose');

const eventSchema =mongoose.Schema({
    titreEvent: { type: String, required: false },
    _typeEvent : {type: mongoose.Schema.Types.ObjectId, ref: 'typeevents',required: false},
        dateEvent: { type: String, required: false },
        budgetEvent: { type: Number, required: false },
        _checklists:[{type: mongoose.Schema.Types.ObjectId, ref: 'checklist',required: false}],
        owner:{type: mongoose.Schema.Types.ObjectId, ref: 'userClient'}
  })

  module.exports = mongoose.model('event', eventSchema);