const pool = require('../database/index.js');

module.exports = {
  getAll: (placeId, callback) => {
    const query = `SELECT * FROM places INNER JOIN bookings ON places.place_id_serial = bookings.place_id_serial WHERE places.place_id_serial = ${placeId}`;
    pool
      .connect()
      .then((client) => {
        return client
          .query(query)
          .then((response) => {
            client.release();
            callback(response.rows);
          })
          .catch((err) => {
            client.release();
            callback(err);
          });
      });
  },
};
