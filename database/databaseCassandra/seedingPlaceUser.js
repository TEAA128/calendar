// const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const perf = require('execution-time')();
const dataFaker = require('./dataFaker.js');

// start of measuring performance time
perf.start();

const writer1 = csvWriter();
const writer2 = csvWriter();
const writer3 = csvWriter();

const start = 5;
const end = 10;

const writeStream1 = fs.createWriteStream(`../csvCassandra/place_by_id${end}.csv`);
writer1.pipe(writeStream1);

const writeStream2 = fs.createWriteStream(`../csvCassandra/booking_by_place${end}.csv`);
writer2.pipe(writeStream2);

const writeStream3 = fs.createWriteStream(`../csvCassandra/user_by_id${end}.csv`);
writer3.pipe(writeStream3);

for (let j = start; j < end; j += 1) {
  const data = dataFaker.dataPlace_by_id(j);

  for (let i = 0; i < data.length; i += 1) {
    writer1.write({
      place_id_serial: data[i].place_id_serial,
      place_id: data[i].place_id,
      nightly_fee: data[i].nightly_fee,
      cleaning_fee: data[i].cleaning_fee,
      occupancy_tax_rate: data[i].occupancy_tax_rate,
      average_rating: data[i].average_rating,
      number_of_review: data[i].number_of_review,
      max_capacity: data[i].max_capacity,
      location_city: data[i].location_city,
      location_country: data[i].location_country,
    });

    writer2.write({
      place_id_serial: data[i].place_id_serial,
      place_id: data[i].place_id,
      bookings: data[i].bookingsPlace,
    });

    writer3.write({
      user_id_serial: data[i].place_id_serial,
      user_id: data[i].place_id,
      bookings: data[i].bookingsUser,
    });
  }
}

console.log('Generated 1mil data');
writer1.end();
writer2.end();
writer3.end();

// end of measuring performance time
const results = perf.stop();
console.log(results.time); // in milliseconds
