const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

let calendarSchema = new mongoose.Schema({
  id: Number,
  nightly_fee: Number,
  cleaning_fee: Number,
  occupancy_tax_rate: Number,
  avg_rating: Number,
  reviews: Number,
  city: String,
  max_capacity: Number,
  bookings: [{
      checkin: Date,
      checkout: Date,
      guests: {
          adults: Number,
          children: Number,
          infants: Number
        }
      }]
  });

let Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;

