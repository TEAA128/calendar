const faker = require('faker');
const fs = require('fs');
const perf = require('execution-time')();
const csvWriter = require('csv-write-stream');

// start of measuring performance time
perf.start();

const dataOneMillion = () => {
  const data = [];
  for (let i = 0; i < 1000000; i += 1) {
    const oneSet = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      address_line_1: faker.address.streetAddress(),
      address_line_2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      zip_code: faker.address.zipCode(),
      email: faker.internet.email(),
    };
    data.push(oneSet);
  }
  return data;
};

for (let j = 5; j < 10; j += 1) {
  const data = dataOneMillion();
  const writer = csvWriter();

  const writeStream = fs.createWriteStream(`../../csvPostgresql/usersTable${j}.csv`);
  writer.pipe(writeStream);
  for (let i = 0; i < 1000000; i += 1) {
    writer.write(
      data[i],
    );
  }
  console.log(`Generated ${j + 1}mil data`);
  writer.end();
}

console.log('Generated 10mil data');

// end of measuring performance time
const results = perf.stop();
console.log(results.time); // in milliseconds