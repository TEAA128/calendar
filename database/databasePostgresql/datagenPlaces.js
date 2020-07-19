const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

for (let j = 1; j < 2; j += 1) {
  const writeStream = fs.createWriteStream(`../csvPostgresql/placesTable${j}.csv`);
  writer.pipe(writeStream);
  for (let i = 0; i < 1000000; i += 1) {
    writer.write(
      {
        place_id_serial: i + 1 + 1000000 * j,
        place_id: faker.random.uuid(),
        nightly_fee: Math.floor(Math.random() * 300) + 60,
        cleaning_fee: Math.floor(Math.random() * 150) + 50,
        occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
        average_rating: (Math.random() * (5 - 1) + 1).toFixed(2),
        number_of_review: Math.floor(Math.random() * (250 - 1) + 1),
        max_capacity: Math.floor(Math.random() * (15 - 2) + 2),
        location_city: faker.address.city(),
        location_country: faker.address.country(),
      },
    );
  }
  console.log(`finished ${j} million`);
}

console.log('Generated 10mil data');
writer.end();
