const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const pool = require('../database/index.js');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  // Workers share the TCP connection in this server
  const app = express();
  app.use(compression());

  // All workers use this port
  const port = 3001;

  app.use(cors());

  app.use('/calendar/:placeId', express.static(path.join(__dirname, '../client/dist/')));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // get request bookings
  app.get('/api/calendar/booking/:placeId', (req, res) => {
    const { placeId } = req.params;
    const query = `SELECT * FROM bookings WHERE place_id_serial = ${placeId}`;
    pool
      .connect()
      .then((client) => {
        return client
          .query(query)
          .then((response) => {
            client.release();
            res.status(200).json(response.rows);
          })
          .catch((err) => {
            client.release();
            res.status(404).send(err.stack);
          });
      });
  });

  app.get('/api/calendar/place/:placeId', (req, res) => {
    const { placeId } = req.params;
    const query = `SELECT * FROM bookings INNER JOIN users
      ON bookings.user_id_serial = users.user_id_serial
      WHERE place_id_serial = ${placeId}`;
    pool
      .connect()
      .then((client) => {
        return client
          .query(query)
          .then((response) => {
            client.release();
            res.status(200).json(response.rows);
          })
          .catch((err) => {
            client.release();
            res.status(404).send(err.stack);
          });
      });
  });


  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

// patch request
// app.patch('/api/calendar/:placeID', () => {console.log('This is PATCH')});

// post request,
// app.post('/api/calendar/:placeID', Controller.post);

// // delete request
// app.delete('/api/calendar/:placeID', () => {console.log('This is delete')});
