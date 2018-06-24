'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

/* Importing Routes */
const user = require('./routes/user');
const federal_district = require('./routes/federal_district');
const local_district = require('./routes/local_district');
const zone = require('./routes/zone');
const section = require('./routes/section');
const section_type = require('./routes/section_type');
const box_ubication = require('./routes/box_ubication');
const box = require('./routes/box');
const occupation = require('./routes/occupation');
const voter = require('./routes/voter');
const statistic = require('./routes/statistic');

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
app.use('/api', user);
app.use('/api', federal_district);
app.use('/api', local_district);
app.use('/api', zone);
app.use('/api', section);
app.use('/api', section_type);
app.use('/api', box_ubication);
app.use('/api', box);
app.use('/api', occupation);
app.use('/api', voter);
app.use('/api', statistic);

/* Export module */
module.exports = app;