const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

const start = 75;
const end = 80;

const writeStream = fs.createWriteStream(`../csvPostgresql/bookingsTable${end}.csv`, { flags: 'a' });
writer.pipe(writeStream);

for (let j = start; j < end; j += 1) {
  for (let i = 0; i < 1000000; i += 1) {
    writer.write(
      {
        booking_id_serial: j * 1000000 + i + 1,
        booking_id: faker.random.uuid(),
        adults: Math.floor(Math.random() * 6) + 1,
        children: Math.floor(Math.random() * 3) + 1,
        infants: Math.floor(Math.random() * 2) + 0,
        checkin: faker.date.between(`2020-0${8 + j - start}-1`, `2020-0${8 + j - start}-3`).toISOString().slice(0, 10),
        checkout: faker.date.between(`2020-0${8 + j - start}-6`, `2020-0${8 + j - start}-9`).toISOString().slice(0, 10),
        b_nightly_fee: Math.floor(Math.random() * 300) + 60,
        b_cleaning_fee: Math.floor(Math.random() * 150) + 50,
        b_occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
        place_id_serial: 9000000 + i + 1,
        user_id_serial: 9000000 + i + 1,
      },
    );
  }
}

console.log('Generated 5mil data and done');
writer.end();
