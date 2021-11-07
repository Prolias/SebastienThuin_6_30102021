const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.nr0d3.mongodb.net/hot-takes?retryWrites=true&w=majority`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error(err));

app.get('/api/', (req, res) => {
    res.send('Accessed to /api/')
})

module.exports = app;