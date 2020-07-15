const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

for (let j = 9; j < 10; j += 1) {
  const writeStream = fs.createWriteStream(`../csvPostgresql/usersTable${j}.csv`);
  writer.pipe(writeStream);
  for (let i = 0; i < 1000000; i += 1) {
    writer.write(
      {
        user_id_serial: j * 1000000 + i + 1,
        user_id: faker.random.uuid(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        zip_code: faker.address.zipCode(),
        email: faker.internet.email(),
      },
    );
  }
  console.log(`Generated ${j + 1}mil data`);
}

console.log('Generated 1mil data');
writer.end();
