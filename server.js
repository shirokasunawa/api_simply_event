const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// set up port
const PORT = process.env.PORT || 3000;


const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/myEvent', {useNewUrlParser : true});
 const db = mongoose.connection
 db.on('error',(error)=> console.log(error))
 db.once('open',()=> console.log('Connected to Database'))

app.use(express.json())



const eventRouter = require('./routes/router')
app.use('/events',eventRouter)
'localhost:3000/events'


// run server
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`
));
