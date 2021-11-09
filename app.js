const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.nr0d3.mongodb.net/hot-takes?retryWrites=true&w=majority`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error(err));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', authRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;