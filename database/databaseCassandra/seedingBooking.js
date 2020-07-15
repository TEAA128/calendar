// const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const perf = require('execution-time')();
const dataFaker = require('./dataFaker.js');

// start of measuring performance time
perf.start();

const writer = csvWriter();

const start = 75;
const end = 80;

const writeStream = fs.createWriteStream(`../csvCassandra/booking_by_id${end}.csv`);
writer.pipe(writeStream);

for (let j = start; j < end; j += 1) {
  const data = dataFaker.dataBooking_by_id(j);

  for (let i = 0; i < data.length; i += 1) {
    writer.write({
      booking_id_serial: data[i].booking_id_serial,
      booking_id: data[i].booking_id,
      place_id: data[i].place_id,
      user_id: data[i].user_id,
      adults: data[i].adults,
      children: data[i].children,
      infants: data[i].infants,
      checkin: data[i].checkin,
      checkout: data[i].checkout,
      nightly_fee: data[i].nightly_fee,
      cleaning_fee: data[i].cleaning_fee,
      occupancy_tax_rate: data[i].occupancy_tax_rate,
    });
  }
}

console.log('Generated 10mil data');
writer.end();

// end of measuring performance time
const results = perf.stop();
console.log(results.time); // in milliseconds
