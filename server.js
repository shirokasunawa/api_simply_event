const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// set up port
const PORT = process.env.PORT || 3030;


const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/myEvent', {useNewUrlParser : true, useUnifiedTopology: true});
 const db = mongoose.connection
 db.on('error',(error)=> console.log(error))
 db.once('open',()=> console.log('Connected to Database'))

app.use(express.json())

app.use(
    cors({
        origin: ["http://192.168.1.14","http://localhost"]
    })
)


const eventRouter = require('./routes/router')
const payment = require('./routes/payment')

app.use('/events',eventRouter)
'localhost:3030/events'
app.use('/payment',payment)
'localhost:3030/payment'

// run server
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`
));
