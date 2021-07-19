var mongoose = require('mongoose');
 
var pub = new mongoose.Schema({
   
   img: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
   typeAbo : { type: String, required: true },
   dateDebut : { type: String, required: false },
   dateFin : { type: String, required: false },
   nbrClick : { type: Number, required: false },
   nbrClickReel : { type: Number, required: false },
   endroit : { type: String, required: false }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('pub', pub);