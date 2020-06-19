const db  = require('./index.js');
const Calendar = require('./Calendar.js');
const faker = require('faker');

let samplePosts = [];

for (let i = 1; i <= 100; i++) {
  let sample = {
    id: i,
    nightly_fee: Math.ceil(Math.random() * 300) + 60,
    cleaning_fee: Math.ceil(Math.random() * 60) + 20,
    service_fee: Math.ceil(Math.random() * 60) + 20,
    occupancy_tax_fees: Math.floor(Math.random() * 30),
    avg_rating: (Math.random() * 5),
    reviews: (Math.floor(Math.random() * 1000)),
    city: faker.address.city(),
    bookings: [{
      checkin: faker.date.between('2020-08-08', '2020-08-10'),
      checkout: faker.date.between('2020-08-15', '2020-08-10'),
      guests: {
        adults: Math.ceil(Math.random() * 2),
        children: Math.floor(Math.random() * 2),
        infants: Math.floor(Math.random())
      }
    }]
  }
  samplePosts.push(sample);
}

const insertSampleCalendar = function() {
  Calendar.create(samplePosts)
    .then(() => db.disconnect());
};

insertSampleCalendar();
