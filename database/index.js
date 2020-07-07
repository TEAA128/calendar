const mongoose = require('mongoose');
const mongoUri = 'mongodb://172.17.0.2/calendar';

const db = mongoose.connect(mongoUri);

module.exports = db;
