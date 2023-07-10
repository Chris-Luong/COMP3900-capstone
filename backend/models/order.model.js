const db = require("../db/db");
const { getOrders, createOrder } = require("../db/queries/order.queries");


const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";
const CANNOT_CREATE = 400
const CANNOT_CREATE_KIND = 'cannot_create'

class Order {
  static getOrderByAccountId(accountId, next) {
    db.query(getOrders, accountId, (err, results) => {
      if (err) {
        next(
          {
            status: EXISTS,
            message: "Error retrieving menu items by the given account id",
            kind: EXISTS_KIND,
          },
          null
        );
        return;
      }
      console.log(results);
      let result = JSON.parse(JSON.stringify(results));
      next(null, result);
    });
  }

  static getOrderByOrderId(orderId, next) {
    db.query(getMenuItemsByOrder, orderId, (err, results) => {
      if (err) {
        next(
          {
            status: EXISTS,
            message: "Error retrieving menu items by the given account id",
            kind: EXISTS_KIND,
          },
          null
        );
        return;
      }
      console.log(results);
      let result = JSON.parse(JSON.stringify(results));
      next(null, result);
    });
  }

  static createOrder(tableId, next) {
    let values = [tableId];
    db.query(createOrder, values, (err, results) => {
      if (err) {
        next(
          {
            status: CANNOT_CREATE,
            message: "Error inserting and creating an order",
            kind: CANNOT_CREATE_KIND
          },
          null
        );
        return;
      }
      let orderId = results.insertId;
      next(null, {orderId: orderId});
    });
  }
}

module.exports = { Order, NOT_FOUND, EXISTS, CANNOT_CREATE };
