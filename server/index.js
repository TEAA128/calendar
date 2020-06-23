const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const path = require('path');

const Calendar = require('../database/Calendar.js');

const app = express();
const port = 3001;

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => res.send('Hello World!'));

app.use(bodyParser.urlencoded({extended: true}));

// get request
app.get('/api/:placeID', (req, res) => {
  const place = req.params.placeID;

  Calendar.find(place)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    })
});

// patch request
app.patch('/api/:placeID', (req, res) => {
  const place = req.params.placeID;
  const add = req.body;

  Calendar.patch(place, add)
    .then((data) => {
      res.send('patch success! (from server)');
    })
    .catch((err) => {
      res.send(err);
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));