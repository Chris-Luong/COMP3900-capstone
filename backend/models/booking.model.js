const db  = require('../db/db');
const { findBooking, findBookingByAccountId,createBookingByTableId, viewBookingsByDate } = require('../db/queries/booking.queries');

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

    return db.query(findBookingByAccountId, [accountId, date], (err, results) => {
      console.log("MySQL Error: " + err);
      console.log("MySQL Result:", results);

      if (err) {
        return next({
          status: NOT_FOUND,
          message: 'Same Account Cannot Book Twice On the Same Date',
          kind: NOT_FOUND_KIND
        }, null);
      }
      
      if (results.length >= 1) {
        return next({
          status: CANNOT_CREATE,
          message: 'Same Account Cannot Book Twice On the Same Date',
          kind: CANNOT_CREATE_KIND
        }, null);
      }
      const param = [date,  time, guests];

      db.query(findBooking, param, (err2, find_results) => {
        console.log("MySQL Error: " + err2);
        console.log("MySQL Result:", find_results);
        if (err2) {
          next(
            {
              status: NOT_FOUND,
              message: "No Available Tables",
              kind: NOT_FOUND,
            },
            null
          ); 
        }

        if (find_results.length == 0) {
          next(
            {
              status: NOT_FOUND,
              message: "No Available Tables",
              kind: NOT_FOUND,
            },
            null
          ); 
        }
        let result = JSON.parse(JSON.stringify(find_results)); 
        console.log(result[0])
        let tableId = result[0].tableId;
        const param2 = [accountId, tableId, date, time, guests];

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
          next(null, create_results.insertId)
        })

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