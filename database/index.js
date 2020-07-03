const mongoose = require('mongoose');
const mongoUri = 'mongodb://database/calendar';

const db = mongoose.connect(mongoUri);

module.exports = db;