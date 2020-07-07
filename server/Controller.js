const Calendar = require('../database/Calendar.js');

const find = function (req, res) {
  const placeID = req.params.placeID;
  Calendar.find({ id: placeID })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

const patch = function (req, res) {
  const placeID = req.params.placeID;
  const obj = req.body;
  Calendar.update({ id: placeID }, { $push: { bookings: obj } })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

module.exports = {
  find,
  patch
}