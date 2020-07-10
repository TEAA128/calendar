const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

writer.pipe(fs.createWriteStream('./placesTable.csv'));
for (let i = 0; i < 1000000; i += 1) {
  writer.write(
    {
      nightly_fee: Math.floor(Math.random() * 300) + 60,
      cleaning_fee: Math.floor(Math.random() * 150) + 50,
      occupance_tax_rate: ((Math.floor(Math.random() * 15) + 8)/100).toFixed(2),
      average_rating: (Math.random() * (5 - 1) + 1).toFixed(2),
      number_of_review: Math.floor(Math.random() * (250 - 1) + 1),
      max_capacity: Math.floor(Math.random() * (15 - 2) + 2),
      location_city: faker.address.city(),
      location_country: faker.address.country(),
    },
  );
}

console.log('Generated 1mil data');
writer.end();
