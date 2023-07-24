const {
  Booking,
  NOT_FOUND,
  NOT_FOUND_KIND,
} = require("../models/booking.model");

createBooking = (req, res) => {
  const { date, start_time, guests, accountId, numHours } = req.body;
  Booking.createBooking(
    date,
    start_time,
    guests,
    accountId,
    numHours,
    (err, result) => {
      if (err) {
        return res.status(err.status).json({ message: err.message });
      }
      if (!result) {
        return res.status(NOT_FOUND).json({ message: "Cannot Create Booking" });
      }
      return res.status(200).json({ bookingId: result });
    }
  );
};

viewBooking = (req, res) => {
  const date = req.params["date"];
  Booking.viewBooking(date, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res
        .status(NOT_FOUND)
        .json({ message: "Cannot Fetch Reservations" });
    }
    return res.status(200).json(result);
  });
};

module.exports = {
  createBooking,
  viewBooking,
};
