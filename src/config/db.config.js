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
db.roles = require('../models/role')(votes_app, Sequelize);
db.users = require('../models/user')(votes_app, Sequelize);
db.zone_bosses = require('../models/zone_boss')(votes_app, Sequelize);
db.section_bosses = require('../models/section_boss')(votes_app, Sequelize);
db.territory_bosses = require('../models/territory_boss')(votes_app, Sequelize);
db.promoters = require('../models/promoter')(votes_app, Sequelize);
db.federal_districts = require('../models/federal_district')(votes_app, Sequelize);
db.local_districts = require('../models/local_district')(votes_app, Sequelize);
db.zones = require('../models/zone')(votes_app, Sequelize);
db.sections = require('../models/section')(votes_app, Sequelize);
db.section_types = require('../models/section_type')(votes_app, Sequelize);
db.box_ubications = require('../models/box_ubication')(votes_app, Sequelize);
db.boxes = require('../models/box')(votes_app, Sequelize);
db.occupations = require('../models/occupation')(votes_app, Sequelize);
db.voters = require('../models/voter')(votes_app, Sequelize);

/* Relations */

/* Export module */
module.exports = db;