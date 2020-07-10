const faker = require('faker');
const jsonexport = require('jsonexport');
const fs = require('fs');
const postgreDB = require('./indexPSQL.js');

const placesData = [];
for (let i = 0; i < 10000; i += 1) {
  const places = {
    nightly_fee: Math.floor(Math.random() * 300) + 60,
    cleaning_fee: Math.floor(Math.random() * 150) + 50,
    occupance_tax_rate: ((Math.floor(Math.random() * 15) + 8)/100).toFixed(2),
    average_rating: (Math.random() * (5 - 1) + 1).toFixed(2),
    number_of_review: Math.floor(Math.random() * (250 - 1) + 1),
    max_capacity: Math.floor(Math.random() * (15 - 2) + 2),
    location_city: faker.address.city(),
    location_country: faker.address.country(),
  };

  placesData.push(places);
}

jsonexport(placesData, (err, csv) => {
  if (err) return console.error(err);
  fs.writeFile('./test100.csv', csv, (err) => {
    if (err) throw err;
    console.log('done writing to csv file');
  });
});


// fs.writeFile("./data.json", JSON.stringify(contacts), (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("The file was saved!");
// });

// const reader = fs.createReadStream('data.json');
// const writer = fs.createWriteStream('out.csv');

// reader.pipe(jsonexport()).pipe(writer);

// // Or
// fs.writeFileSync('/tmp/test-sync', 'Hey there!');