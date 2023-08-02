const db = require("../db/db");
const {
  findBooking,
  findBookingByAccountId,
  viewBookingsByAccountId,
  createBookingByTableId,
  viewBookingsByDate,
  deleteBooking,
  deleteBookingByAccount,
  getBooking,
  updateBookingToSeated,
  verifyBookingByAccount,
  verifyBookingById,
} = require("../db/queries/booking.queries");

const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";
const CANNOT_CREATE = 400;
const CANNOT_UPDATE = 401;
const CANNOT_UPDATE_KIND = "cannot_update";
const CANNOT_CREATE_KIND = "cannot_create";

class Booking {
  constructor(date, time, capacity, accountId) {
    this.date = date;
    this.time = time;
    this.capacity = capacity;
    this.accountId = accountId;
  }

  static createBooking(date, start_time, guests, accountId, numHours, next) {
    return db.query(
      findBookingByAccountId,
      [accountId, date],
      (err, results) => {
        console.log("MySQL Error: " + err);
        console.log("MySQL Result:", results);

        if (err) {
          return next(
            {
              status: NOT_FOUND,
              message: "Same Account Cannot Book Twice On the Same Date",
              kind: NOT_FOUND_KIND,
            },
            null
          );
        }

        if (results.length >= 1) {
          return next(
            {
              status: CANNOT_CREATE,
              message: "Same Account Cannot Book Twice On the Same Date",
              kind: CANNOT_CREATE_KIND,
            },
            null
          );
        }

        const start_time_date = new Date(`1970-01-01T${start_time}`);

        start_time_date.setHours(start_time_date.getHours() + numHours);
        const end_time = start_time_date.toTimeString().slice(0, 8);
        console.log("end time: " + end_time);
        const param = [
          date,
          start_time,
          start_time,
          start_time,
          end_time,
          guests,
        ];

        db.query(findBooking, param, (err2, find_results) => {
          console.log("MySQL Error: " + err2);
          console.log("MySQL Result:", find_results);
          if (err2) {
            return next(
              {
                status: NOT_FOUND,
                message: "No Available Tables",
                kind: NOT_FOUND,
              },
              null
            );
          }

          if (find_results.length == 0 || find_results == []) {
            return next(
              {
                status: NOT_FOUND,
                message: "No Available Tables",
                kind: NOT_FOUND,
              },
              null
            );
          }

          let result = JSON.parse(JSON.stringify(find_results));
          console.log(result[0]);
          let tableId = result[0].tableId;
          const param2 = [
            accountId,
            tableId,
            date,
            start_time,
            end_time,
            guests,
          ];

          db.query(createBookingByTableId, param2, (err3, create_results) => {
            console.log("MySQL Error: " + err3);
            console.log("MySQL Result:", create_results);
            if (err3) {
              next(
                {
                  status: CANNOT_CREATE,
                  message: "Error creating the booking",
                  kind: CANNOT_CREATE_KIND,
                },
                null
              );
            }
            if (create_results.affectedRows == 0) {
              next(
                {
                  status: CANNOT_CREATE,
                  message: "Error creating the booking",
                  kind: CANNOT_CREATE_KIND,
                },
                null
              );
            }
            next(null, {
              bookingId: create_results.insertId,
              tableId: tableId,
            });
          });
        });
      }
    );
  }

  static viewBooking(date, next) {
    return db.query(viewBookingsByDate, [date], (err, results) => {
      console.log("MySQL Error: " + err);
      console.log("MySQL Result:", results);

      if (err) {
        return next(
          {
            status: NOT_FOUND,
            message: "Cannot fetch reservations",
            kind: NOT_FOUND_KIND,
          },
          null
        );
      }

      let result = JSON.parse(JSON.stringify(results));
      next(null, result);
    });
  }

  static viewBookingsByAccountId(accountId, next) {
    return db.query(viewBookingsByAccountId, [accountId], (err, results) => {
      console.log("MySQL Error: " + err);
      console.log("MySQL Result:", results);

      if (err) {
        return next(
          {
            status: NOT_FOUND,
            message: "Cannot fetch bookings",
            kind: NOT_FOUND_KIND,
          },
          null
        );
      }

      let result = JSON.parse(JSON.stringify(results));
      next(null, result);
    });
  }

  static deleteBooking(id, next) {
    return db.query(deleteBooking, id, (err, results) => {
      if (err) {
        return next(
          {
            status: NOT_FOUND,
            message: "Cannot delete booking",
            kind: NOT_FOUND_KIND,
          },
          null
        );
      }
      next(null, { message: `Deleted booking id ${id}` });
    });
  }

  static deleteBookingByAccountId(id, next) {
    return db.query(deleteBookingByAccount, id, (err, results) => {
      if (err) {
        return next(
          {
            status: NOT_FOUND,
            message: "Cannot delete booking for account",
            kind: NOT_FOUND_KIND,
          },
          null
        );
      }
      next(null, { message: `Deleted all bookings for account ${id}` });
    });
  }

  static getBooking(id, next) {
    return db.query(getBooking, id, (err, results) => {
      if (err || results.length === 0) {
        return next(
          {
            status: NOT_FOUND,
            message: `Booking with id ${id} was not found`,
            kind: NOT_FOUND_KIND,
          },
          null
        );
      }
      console.log(results);
      next(null, JSON.parse(JSON.stringify(results)));
    });
  }

  static updateBooking(bookingId, next) {
    return db.query(updateBookingToSeated, bookingId, (err, results) => {
      if (err || results.length === 0) {
        return next(
          {
            status: CANNOT_UPDATE,
            message: `Failed to updated booking ${bookingId}`,
            kind: CANNOT_UPDATE,
          },
          null
        );
      }
      if (results.affectedRows == 0) {
        return next(
          {
            status: CANNOT_UPDATE,
            message: `Failed to updated booking ${bookingId}`,
            kind: CANNOT_UPDATE,
          },
          null
        );
      }
      next(null, { success: "true" });
    });
  }

  static verifyBooking(bookingId, next) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const date = `${year}-${month}-${day}`;
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    const start_time = `${hours}:${minutes}:${seconds}`;

    return db.query(
      verifyBookingById,
      [bookingId, date, start_time, start_time],
      (err, results) => {
        if (err || results.length === 0) {
          console.log(err);
          console.log(results.length);
          console.log(date);
          console.log(start_time);
          return next(
            {
              status: EXISTS,
              message: `Given booking is not valid at this time`,
              kind: EXISTS_KIND,
            },
            null
          );
        }
        const result = JSON.parse(JSON.stringify(results));
        next(null, result[0]);
      }
    );
  }
}

module.exports = {
  Booking,
  NOT_FOUND,
  NOT_FOUND_KIND,
  CANNOT_CREATE,
  CANNOT_CREATE_KIND,
};
