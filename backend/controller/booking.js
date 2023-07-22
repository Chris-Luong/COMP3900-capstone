const { Booking, NOT_FOUND, NOT_FOUND_KIND } = require('../models/booking.model'); 

createBooking = (req, res) => {
    const { date, time, capacity, accountId } = req.body;
    Booking.createBooking(date, time, capacity, accountId, (err, result) => {
      if (err) {
        return res.status(err.status).json({ message: err.message });
      }
      if (!result) {
        return res.status(NOT_FOUND).json({ message: "Cannot Create Order" });
      }
      return res.status(200).json({bookingId: result});
    });
};

module.exports = {
   createBooking
  };