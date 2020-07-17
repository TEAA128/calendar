const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const cors = require('cors');
// const path = require('path');
const controller = require('./Controller.js');

// const Calendar = require('../database/Calendar.js');

const app = express();
const port = 3001;

app.use(cors());
app.use('/calendar/', express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get request
app.get('/api/calendar/:placeID', () => {console.log('this is GET')});
// patch request
// app.patch('/api/calendar/:placeID', () => {console.log('This is PATCH')});

// post request,
// app.post('/api/calendar/:placeID', Controller.post);

// // delete request
// app.delete('/api/calendar/:placeID', () => {console.log('This is delete')});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));