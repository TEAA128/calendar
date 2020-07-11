const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

writer.pipe(fs.createWriteStream('../csvPostgresql/usersTable.csv'));
for (let i = 0; i < 1000000; i += 1) {
  writer.write(
    {
      user_id_serial: i + 1,
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

console.log('Generated 1mil data');
writer.end();
