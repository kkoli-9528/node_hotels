const express = require('express');
const app = express();
const db = require('./db');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
const passport = require('./auth');

app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // Move to the next phase
};

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', function (req, res) {
    res.send('Welcome to my Hotel');
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the routers
// app.use('/person', localAuthMiddleware, personRoutes) // Authentication using local strategy(username, password)
app.use('/person', personRoutes) // Authentication via JWT Tokens
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});