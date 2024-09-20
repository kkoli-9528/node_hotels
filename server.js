const express = require('express');
const app = express();
const db = require('./db');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Welcome to my Hotel');
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the routers
app.use('/person', personRoutes)
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});