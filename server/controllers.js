const models = require('./models.js');

module.exports = {
  getBookings: (req, res) => {
    const { placeId } = req.params;
    models.getAll(placeId, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  addBooking: (req, res) => {
    const { placeId } = req.params;
    const {
      nightlyFee, cleaningFee, occupancyTaxRate, guests, checkin, checkout, userId,
    } = req.body;
    models.getAll(nightlyFee, cleaningFee, occupancyTaxRate, checkin, checkout, guests.adults, guests.children, guests.infants, placeId, userId, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
};
