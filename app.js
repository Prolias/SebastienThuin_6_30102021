const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.nr0d3.mongodb.net/hot-takes?retryWrites=true&w=majority`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/sauce', sauceRoutes);

module.exports = app;