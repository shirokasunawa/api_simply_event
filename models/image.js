var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
   
   img: { type: String, required: true }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);