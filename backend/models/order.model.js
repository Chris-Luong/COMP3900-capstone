const db = require("../db/db");
const { getMenuItemsByOrder, createOrder } = require("../db/queries/order.queries");


const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";
const CANNOT_CREATE = 400
const CANNOT_CREATE_KIND = 'cannot_create'

class Order {
  constructor(name, description, price, availability) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.availability = availability;
  }

  static getOrderById(orderId, next) {
    console.log("order id" + orderId);
    return db.query(getMenuItemsByOrder, [orderId], (err, results) => {
      console.log("MySQL Error: " + err);
      console.log("MySQL Result:", results);

      if (err) {
        return next(
          {
            status: EXISTS,
            message: "Error retrieving menu items by the given order id",
            kind: EXISTS_KIND,
          },
          null
        );
      }
      
      let result = JSON.parse(JSON.stringify(results));
      return next(null, result);
    });
  }

  static createOrder(accountId, tableId, next) {
    return db.query(createOrder, [accountId, tableId], (err, results) => {
        console.log("MySQL Error: " + err);
        console.log("MySQL Result:", results);
  
        if (err) {
          return next(
            {
              status: CANNOT_CREATE,
              message: "Error inserting and creating an order",
              kind: CANNOT_CREATE_KIND,
            },
            null
          );
        }
        const res = results.insertId 
        return next(null, { orderId: res });
      });
  }

}

module.exports = { Order, NOT_FOUND, EXISTS, CANNOT_CREATE };
