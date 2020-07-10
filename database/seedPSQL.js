const jsonexport = require('jsonexport');
const fs = require('fs');

// const reader = fs.createReadStream('data.json');
// const writer = fs.createWriteStream('out.csv');

// reader.pipe(jsonexport()).pipe(writer);

const contacts = [{
  name: 'Bob',
  lastname: 'Smith'
}, {
  name: 'James',
  lastname: 'David'
}, {
  name: 'Robert',
  lastname: 'Miller'
}, {
  name: 'David',
  lastname: 'Martin'
}];

jsonexport(contacts, function(err, csv){
    if (err) return console.error(err);
    console.log(csv);
});


fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

// Or
fs.writeFileSync('/tmp/test-sync', 'Hey there!');