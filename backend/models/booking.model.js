const db  = require('../db/db');
const { findBooking, createBookingByTableId, viewBookingsByDate } = require('../db/queries/booking.queries');

const NOT_FOUND = 401
const NOT_FOUND_KIND = "not_found"
const EXISTS = 409
const EXISTS_KIND = "exists"
const CANNOT_CREATE = 400;
const CANNOT_CREATE_KIND = "cannot_create";

class Booking {

  constructor(date, time, capacity, accountId) {
    this.date = date;
    this.time = time;
    this.capacity = capacity;
    this.accountId = accountId;
  }

  static createBooking(date, time, guests, accountId, next) {
    const param = [date,  time, guests];

    return db.query(findBooking, param, (err, results) => {
      console.log("MySQL Error: " + err);
      console.log("MySQL Result:", results);

      if (err) {
        return next({
          status: NOT_FOUND,
          message: 'No Available Tables',
          kind: NOT_FOUND_KIND
        }, null);
      }
      
      if (results.length == 0) {
        return next({
          status: NOT_FOUND,
          message: 'No Available Tables',
          kind: NOT_FOUND_KIND
        }, null);
      }

      let result = JSON.parse(JSON.stringify(results)); 
      console.log(result[0])
      let tableId = result[0].tableId;
      const param2 = [accountId, tableId, date, time, guests];

      db.query(createBookingByTableId, param2, (err2, create_results) => {
        console.log("MySQL Error: " + err2);
        console.log("MySQL Result:", create_results);
        if (err2) {
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
        next(null, create_results.insertId)
      })
    })
    }


    static viewBooking(date, next) {
      return db.query(viewBookingsByDate, [date], (err, results) => {
        console.log("MySQL Error: " + err);
        console.log("MySQL Result:", results);
  
        if (err) {
          return next({
            status: NOT_FOUND,
            message: 'Cannot fetch reservations',
            kind: NOT_FOUND_KIND
          }, null);
        }
        
        let result = JSON.parse(JSON.stringify(results)); 
        next(null, result);
      })
      }

}

module.exports = { Booking, NOT_FOUND, NOT_FOUND_KIND, CANNOT_CREATE, CANNOT_CREATE_KIND };