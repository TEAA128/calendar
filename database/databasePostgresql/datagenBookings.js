const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const perf = require('execution-time')();

perf.start();

const placeidserial = 0;
const useridserial = 9000000;

const dataOneMillion = () => {
  const data = [];
  for (let k = 0; k < 5; k += 1) {
    for (let i = 0; i < 1000000; i += 1) {
      const oneSet = {
        adults: Math.floor(Math.random() * 6) + 1,
        children: Math.floor(Math.random() * 3) + 1,
        infants: Math.floor(Math.random() * 2) + 0,
        checkin: faker.date.between(`2020-0${8 + k}-1`, `2020-0${8 + k}-3`).toISOString().slice(0, 10),
        checkout: faker.date.between(`2020-0${8 + k}-6`, `2020-0${8 + k}-9`).toISOString().slice(0, 10),
        b_nightly_fee: Math.floor(Math.random() * 300) + 60,
        b_cleaning_fee: Math.floor(Math.random() * 150) + 50,
        b_occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
        place_id_serial: placeidserial + i + 1,
        user_id_serial: useridserial + i + 1,
      };
      data.push(oneSet);
    }

    for (let i = 0; i < 1000000; i += 1) {
      const oneSet = {
        adults: Math.floor(Math.random() * 6) + 1,
        children: Math.floor(Math.random() * 3) + 1,
        infants: Math.floor(Math.random() * 2) + 0,
        checkin: faker.date.between(`2020-0${8 + k}-15`, `2020-0${8 + k}-18`).toISOString().slice(0, 10),
        checkout: faker.date.between(`2020-0${8 + k}-20`, `2020-0${8 + k}-28`).toISOString().slice(0, 10),
        b_nightly_fee: Math.floor(Math.random() * 300) + 60,
        b_cleaning_fee: Math.floor(Math.random() * 150) + 50,
        b_occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
        place_id_serial: placeidserial + i + 1,
        user_id_serial: useridserial + i + 1,
      };
      data.push(oneSet);
    }
  }
  return data;
};

for (let j = 9; j < 10; j += 1) {
  const data = dataOneMillion();

  const writer = csvWriter();
  const writeStream = fs.createWriteStream(`../../csvPostgresql/bookingsTable${j}.csv`);
  writer.pipe(writeStream);
  for (let i = 0; i < 10000000; i += 1) {
    writer.write(
      data[i],
    );
  }
  writer.end();
}

console.log('Generated 10mil data and done');

// end of measuring performance time
const results = perf.stop();
console.log(results.time); // in milliseconds