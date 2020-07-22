// const newrelic = require('newrelic');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const controllers = require('./controllers.js');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
} else {
  const app = express();
  app.use(compression());
  const port = 3001;

  app.use(cors());
  app.use('/calendar', express.static(path.join(__dirname, '../client/dist/')));
  app.use('/loaderio-0e1f71bc56b5e76e0e9be873332039ca.txt', express.static(path.join(__dirname, '../client/dist/loaderio-0e1f71bc56b5e76e0e9be873332039ca.txt')));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // get request bookings
  app.get('/api/calendar/bookings/:placeId', controllers.getBookings);

  app.post('/api/calendar/bookings/:placeId', controllers.addBooking);

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}
