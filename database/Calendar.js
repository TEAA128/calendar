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
// nights: Number,
// checkin: Date,
// guests: {
//   adults: Number,
//   children: Number,
//   infants: Number
// },

let Calendar = mongoose.model('Calendar', calendarSchema);

let find = (placeID) => {
  return Calendar.find({id: placeID});
}


module.exports = {
  Calendar,
  find
}

