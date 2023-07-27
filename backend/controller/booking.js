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
      return res.status(200).json(result);
    }
  );
};

viewBooking = (req, res) => {
  if (req.query.accountId) {
    Booking.viewBookingsByAccountId(req.query.accountId, (err, result) => {
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
  } else if (req.query.date) {
    Booking.viewBooking(req.query.date, (err, result) => {
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
  }
};

deleteBooking = (req, res) => {
  const id = req.body.id;
  Booking.deleteBooking(id, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Cannot delete booking" });
    }
    return res.status(200).json(result);
  });
};

deleteBookingByAccountId = (req, res) => {
  const id = req.body.id;
  Booking.deleteBookingByAccountId(id, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Cannot delete bookings" });
    }
    return res.status(200).json(result);
  });
};

getBooking = (req, res) => {
  const id = req.params["bookingId"];
  Booking.getBooking(id, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Cannot delete booking" });
    }
    return res.status(200).json(result);
  });
};

module.exports = {
  createBooking,
  viewBooking,
  deleteBooking,
  deleteBookingByAccountId,
  getBooking,
};
