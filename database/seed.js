const db  = require('./index.js');
const Calendar = require('./Calendar.js');

const samplePosts = [
  {
    nightly_fee: 149,
    nights: 2,
    checkin: null,
    checkout: null,
    guests: {
      adults: null,
      children: null,
      infants: null
    },
    cleaning_fee: 60,
    service_fee: 30,
    occupancy_tax_fees: 23,
    avg_rating: 4.89,
    reviews: 711,
    city: "WatsonVille"
  }
];

const insertSampleCalendar = function() {
  Calendar.create(samplePosts)
    .then(() => db.disconnect());
};

insertSampleCalendar();
