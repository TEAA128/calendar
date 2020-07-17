// const Calendar = require('../database/Calendar.js');

const find = (req, res) => {
  const { placeID } = req.params;
  Calendar.find({ id: placeID })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

const patch = (req, res) => {
  const { placeID } = req.params;
  const obj = req.body;
  Calendar.update({ id: placeID }, { $push: { bookings: obj } })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      if (data) res.sendStatus(204).send(data);
    });
};

// const post = function (req, res) {
//   const placeID = req.params.placeID;
//   const obj = req.body;
//   Calendar.save({ id: placeID }, { $push: { bookings: obj } })
//     .exec((err, data) => {
//       if (err) res.sendStatus(400);
//       res.send(data);
//     });
// };

const deleteOne = (req, res) => {
  const { placeID } = req.params;
  const obj = req.body;
  Calendar.findByIdAndRemove({ id: placeID })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.sendStatus(204);
    });
};

module.exports = {
  find,
  patch,
  // post,
  // put,
  deleteOne,
}