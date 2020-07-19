const pool = require('../database/index.js');

module.exports = {
  getAll: (placeId, callback) => {
    const query = 'SELECT * FROM places INNER JOIN bookings ON places.place_id_serial = bookings.place_id_serial WHERE places.place_id_serial = $1';
    pool
      .connect()
      .then((client) => {
        return client
          .query(query, [placeId])
          .then((response) => {
            client.release();
            let data = {
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
            callback(data);
          })
          .catch((err) => {
            client.release();
            callback(err);
          });
      });
  },

  // TODO FIX Booking_id_serial into serial when seeding database in EC2
  createBooking: (placeId, nightlyFee, cleaningFee, occupancyTaxRate, checkin, checkout, adults, children, infants, callback) => {
    const query = 'INSERT INTO bookings(place_id_serial, b_nightly_fee, b_cleaning_fee, b_occupancy_tax_rate, checkin, checkout, adults, children, infants, booking_id, booking_id_serial ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, gen_random_uuid(), 80000005)';
    pool
      .connect()
      .then((client) => {
        return client
          .query(query, [placeId, nightlyFee, cleaningFee, occupancyTaxRate, checkin, checkout, adults, children, infants])
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
