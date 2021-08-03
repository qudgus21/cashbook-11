'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const userPayTrend = require('./user-pay-trend');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};



let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, {
      logging: false,
      host: config.host,
      dialect: config.dialect,
      timezone: "+09:00",
      define: {
        charset: "utf8mb4",
        dialectOptions: {
          collate: "utf8mb4_general_ci"
        }
      },
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  );
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.hasMany(db.UserPayTrend);
db.UserPayTrend.belongsTo(db.User);

db.Category.hasMany(db.UserPayTrend);
db.UserPayTrend.belongsTo(db.Category);

db.User.belongsToMany(db.PayType, { through: db.UserPayType });
db.PayType.belongsToMany(db.User, { through: db.UserPayType });

db.User.hasMany(db.History);
db.History.belongsTo(db.User);

db.PayType.hasMany(db.History);
db.History.belongsTo(db.PayType);

db.Category.hasMany(db.History);
db.History.belongsTo(db.Category);

module.exports = db;
