const express = require('express');
const app = express();

app.get('/api/', (req, res) => {
    res.send('Accessed to /api/')
})

module.exports = app;