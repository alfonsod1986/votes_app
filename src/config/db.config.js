'use strict';

const env = require('./env');
const Sequelize = require('sequelize');
const votes_app = new Sequelize(
    env.database,
    env.username,
    env.password,{
        dialect: env.dialect,
        host: env.host,
        port: env.port,
        operatorsAliases: false,
        pool:{
            max: env.pool.max,
            min: env.pool.min,
            acquire: env.pool.acquire,
            idle: env.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.votes_app = votes_app;

/* Models */
db.federal_districts = require('../models/federal_district')(votes_app, Sequelize);
db.local_districts = require('../models/local_district')(votes_app, Sequelize);
db.occupations = require('../models/occupation')(votes_app, Sequelize);
db.voters = require('../models/voter')(votes_app, Sequelize);

/* Relations */

/* Export module */
module.exports = db;