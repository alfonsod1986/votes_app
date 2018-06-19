'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

/* Importing Routes */
const federal_district = require('./routes/federal_district');
const local_district = require('./routes/local_district');
const occupation = require('./routes/occupation');
const voter = require('./routes/voter');

/* Middlewares */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

/* Routes */
app.use('/api', federal_district);
app.use('/api', local_district);
app.use('/api', occupation);
app.use('/api', voter);


/* Export module */
module.exports = app;