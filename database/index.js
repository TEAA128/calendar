const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/calendar';

const db = mongoose.connect(mongoUri);

module.exports = db;
