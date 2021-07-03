const express = require('express');

const app = express();
const event = require('./models/event');



app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
 res.header("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With, remember-me, Authorization, type ");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Access-Control-Expose-Headers","Authorization");
    next();
  });

 
  app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const event = new Event({
      ...req.body
    });
    event.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;