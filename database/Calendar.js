const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

let calendarSchema = new mongoose.Schema({
  nightly_fee: Number,
  nights: Number,
  checkin: Date,
  checkout: Date,
  guests: {
    adults: Number,
    children: Number,
    infants: Number
  },
  cleaning_fee: Number,
  service_fee: Number,
  occupancy_tax_fees: Number,
  avg_rating: Number,
  reviews: Number,
  city: String
});

let Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;

