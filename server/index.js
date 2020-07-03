const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const path = require('path');
const cors = require('cors');
const Controller = require('./Controller.js');

const Calendar = require('../database/Calendar.js');

const app = express();
const port = 3001;

app.use(cors());
app.use('/calendar/', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));


// get request
app.get('/api/:placeID', Controller.find);
// patch request
app.patch('/api/:placeID', Controller.patch);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));