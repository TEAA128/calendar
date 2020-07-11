const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

writer.pipe(fs.createWriteStream('../csvPostgresql/bookingsTable.csv'));
for (let i = 0; i < 5000000; i += 1) {
  writer.write(
    {
      booking_id_serial: i,
      booking_id: faker.random.uuid(),
      adults: Math.floor(Math.random() * 6) + 1,
      children: Math.floor(Math.random() * 3) + 1,
      infants: Math.floor(Math.random() * 2) + 0,
      checkin: faker.date.between('2020-08-10', '2020-08-15').toISOString().slice(0, 10),
      checkout: faker.date.between('2020-08-15', '2020-08-25').toISOString().slice(0, 10),
      nightly_fee: Math.floor(Math.random() * 300) + 60,
      cleaning_fee: Math.floor(Math.random() * 150) + 50,
      occupance_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
      place_id_serial: Math.floor(Math.random() * 1000000) + 1,
      user_id_serial: Math.floor(Math.random() * 1000000) + 1,
    },
  );
}

console.log('Generated 5mil data');
writer.end();
