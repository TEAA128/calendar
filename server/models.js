const pool = require('../database/index.js');

module.exports = {
  getAll: (placeId, callback) => {
    const query = 'SELECT * FROM places INNER JOIN bookings ON places.id = bookings.place_id_serial WHERE places.id = $1';
    pool
      .connect()
      .then((client) => {
        return client
          .query(query, [placeId])
          .then((response) => {
            client.release();
            const data = {
              id: response.rows[0].id,
              nightly_fee: response.rows[0].nightly_fee,
              cleaning_fee: response.rows[0].cleaning_fee,
              occupancy_tax_rate: response.rows[0].occupancy_tax_rate,
              avg_rating: response.rows[0].average_rating,
              reviews: response.rows[0].number_of_review,
              city: response.rows[0].location_city,
              max_capacity: response.rows[0].max_capacity,
              bookings: [],
            };

            for (let i = 0; i < response.rows.length; i += 1) {
              data.bookings.push({
                checkin: response.rows[i].checkin,
                checkout: response.rows[i].checkout,
              });
            }
            callback(null, data);
          })
          .catch((err) => {
            client.release();
            callback(err, null);
          });
      });
  },

  createBooking: (nightlyFee, cleaningFee, occupancyTaxRate, checkin, checkout, adults, children, infants, placeId, userId, callback) => {
    const query = 'INSERT INTO bookings(b_nightly_fee, b_cleaning_fee, b_occupancy_tax_rate, checkin, checkout, adults, children, infants, place_id_serial, user_id_serial ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    pool
      .connect()
      .then((client) => {
        return client
          .query(query, [nightlyFee, cleaningFee, occupancyTaxRate, checkin, checkout, adults, children, infants, placeId, userId])
          .then((response) => {
            client.release();
            callback(null, response.rows);
          })
          .catch((err) => {
            client.release();
            callback(err, null);
          });
      });
  },
};
