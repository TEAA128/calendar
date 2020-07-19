// const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const perf = require('execution-time')();
const dataFaker = require('./dataFaker.js');

// start of measuring performance time
perf.start();

// const start = 75;
// const end = 80;

for (let count = 0; count < 2; count += 1) {
  const writer = csvWriter();

  const writeStream = fs.createWriteStream(`../../csvCassandra/booking_by_idComlete${count}.csv`);
  writer.pipe(writeStream);

  for (let j = 0; j < 5; j += 1) {
    const data = dataFaker.dataBooking_by_place_id(j);

    for (let i = 0; i < data.length; i += 1) {
      writer.write({
        place_id_serial: data[i].place_id_serial,
        place_id: data[i].place_id,
        average_rating: data[i].average_rating,
        number_of_review: data[i].number_of_review,
        max_capacity: data[i].max_capacity,
        location_city: data[i].location_city,
        location_country: data[i].location_country,
        booking_id_serial: data[i].booking_id_serial,
        booking_id: data[i].booking_id,
        adults: data[i].adults,
        children: data[i].children,
        infants: data[i].infants,
        checkin: data[i].checkin,
        checkout: data[i].checkout,
        nightly_fee: data[i].nightly_fee,
        cleaning_fee: data[i].cleaning_fee,
        occupancy_tax_rate: data[i].occupancy_tax_rate,
        user_id_serial: data[i].user_id_serial,
        user_id: data[i].user_id,
        first_name: data[i].first_name,
        last_name: data[i].last_name,
        address_line_1: data[i].address_line_1,
        address_line_2: data[i].address_line_2,
        city: data[i].city,
        country: data[i].country,
        zip_code: data[i].zip_code,
        email: data[i].email,
      });
    }
  }

  console.log(`Generated 5mil x ${count} entry`);
  writer.end();
}

// end of measuring performance time
const results = perf.stop();
console.log(results.time); // in milliseconds
