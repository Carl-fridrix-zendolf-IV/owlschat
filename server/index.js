/*
* Startup file
* */

const CONFIG = require('./config').CONFIG;
const mongoose = require('mongoose');

mongoose.connect(CONFIG.mongo, error => {
    if (error)
        console.error('Error while connecting to storage', error);

    // If connected successfully
    console.log('Mongo connected successfully!');
});

// Require mongoose models imports
require('./models/imports');

// Require API routes
require('./api/routes');

console.log(`Server started at ${new Date()}`);