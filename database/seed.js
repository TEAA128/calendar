const db  = require('./index.js');
const Calendar = require('./Calendar.js');
const faker = require('faker');

let samplePosts = [];

for (let i = 1; i <= 100; i++) {
  let sample = {
    id: i,
    nightly_fee: Math.ceil(Math.random() * 300) + 60,
    cleaning_fee: Math.ceil(Math.random() * 60) + 20,
    occupancy_tax_rate: (Math.round((Math.random()*.05)*1000)/1000) + .08,
    avg_rating: Math.round((Math.random() * 5) * 100)/100,
    reviews: (Math.floor(Math.random() * 1000)),
    city: faker.address.city(),
    max_capacity: Math.ceil(Math.random() * 9) + 1,
    bookings: [{
      checkin: faker.date.between('2020-08-08', '2020-08-10'),
      checkout: faker.date.between('2020-08-10', '2020-08-15'),
      guests: {
        adults: 2,
        children: 3,
        infants: 2
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
