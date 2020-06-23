const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

let calendarSchema = new mongoose.Schema({
  id: Number,
  nightly_fee: Number,
  cleaning_fee: Number,
  service_fee: Number,
  occupancy_tax_fees: Number,
  avg_rating: Number,
  reviews: Number,
  city: String,
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

// find function
let find = (placeID) => {
  return Calendar.find({id: placeID});
}

// patch function
let patch = (placeID, obj) => {
  return Calendar.update({id: placeID}, {$push: {bookings: obj}});
}

module.exports = {
  Calendar,
  find,
  patch
}

