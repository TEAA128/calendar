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
      nightlyFee, cleaningFee, occupancyTaxRate, guests, checkin, checkout,
    } = req.body;
    models.getAll(nightlyFee, cleaningFee, occupancyTaxRate, placeId, checkin, checkout, guests.adults, guests.children, guests.infants, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
};
