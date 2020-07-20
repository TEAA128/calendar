const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const perf = require('execution-time')();

perf.start();

const dataOneMillion = () => {
  const data = [];
  for (let i = 0; i < 1000000; i += 1) {
    const oneSet = {
      nightly_fee: Math.floor(Math.random() * 300) + 60,
      cleaning_fee: Math.floor(Math.random() * 150) + 50,
      occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
      average_rating: (Math.random() * (5 - 1) + 1).toFixed(2),
      number_of_review: Math.floor(Math.random() * (250 - 1) + 1),
      max_capacity: Math.floor(Math.random() * (15 - 2) + 2),
      location_city: faker.address.city(),
      location_country: faker.address.country(),
    };
    data.push(oneSet);
  }
  return data;
};

for (let j = 5; j < 10; j += 1) {
  const data = dataOneMillion();
  const writer = csvWriter();
  const writeStream = fs.createWriteStream(`../../csvPostgresql/placesTable${j}.csv`);
  writer.pipe(writeStream);
  for (let i = 0; i < 1000000; i += 1) {
    writer.write(
      data[i],
    );
  }
  console.log(`finished ${j} million`);
  writer.end();
}

console.log('Generated 10mil data');

// end of measuring performance time
const results = perf.stop();
console.log(results.time); // in milliseconds