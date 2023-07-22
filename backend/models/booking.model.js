const db  = require('../db/db'); 
const bcrypt = require('bcrypt');
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

  static createBooking(date, time, capacity, accountId, next) {
    const param = [date,  time, capacity];

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
      
      let result = JSON.parse(JSON.stringify(results)); 
      let tableId = result.tableId;
      
      const param2 = [accountId, tableId, date, time];

      db.query(createBookingByTableId, [param2], (err, results) => {
        if (err) {
          next(
            {
              status: CANNOT_CREATE,
              message: "Error creating the booking",
              kind: CANNOT_CREATE_KIND,
            },
            null
          ); 
        }

        if (results.affectedRows == 0) {
          next(
            {
              status: CANNOT_CREATE,
              message: "Error creating the booking",
              kind: CANNOT_CREATE_KIND,
            },
            null
          ); 
        }
      })
      next(null, results.insertId)
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