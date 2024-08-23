require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://totycos:${process.env.PSW_ATLAS}@mongodbtest.mvfxuoc.mongodb.net/?retryWrites=true&w=majority&appName=MongoDBTest`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const thingRoutes = require('./routes/thing');
const userRoutes = require('./routes/user');

app.use('/api/stuff', thingRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
