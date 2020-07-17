const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const pool = require('../database/index.js');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  // Workers share the TCP connection in this server
  const app = express();

  // All workers use this port
  const port = 3001;

  app.use(cors());

  app.use('/calendar/', express.static(path.join(__dirname, '../client/dist/')));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // get request
  app.get('/api/calendar/:placeId', (req, res) => {
    const { placeId } = req.params;
    const query = `SELECT * FROM bookings WHERE booking_id_serial = ${placeId}`;
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query(query, (error, result) => {
        done();
        if (err) {
          res.status(404).send(error.stack);
        } else {
          res.status(200).json(result.rows[0]);
        }
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
