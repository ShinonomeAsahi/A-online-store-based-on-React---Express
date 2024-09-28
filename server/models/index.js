const mongoose = require('../config/mongoose.js'); // Ensure this path is correct
const path = require('path');
const fs = require('fs');
const basename = path.basename(__filename);
const db = {};

// Load all models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

module.exports = db;
