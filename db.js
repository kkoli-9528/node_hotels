const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_LOCAL_CONNECTION_URL;
const mongoURL = process.env.MONGODB_ATLAS_CONNECTION_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
// Mongoose maintaines a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define Event Listeners for the database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;