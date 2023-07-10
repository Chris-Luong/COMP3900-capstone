const db = require("../db/db");
const { getMenuItemsByAccount, getMenuItemsByOrder, createOrder, addMenuItemsToOrder } = require("../db/queries/order.queries");


const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";
const CANNOT_CREATE = 400
const CANNOT_CREATE_KIND = 'cannot_create'

class Order {
  static getOrderByAccountId(accountId, next) {
    db.query(getMenuItemsByAccount, accountId, (err, results) => {
      if (err) {
        console.log("MySQL Error: " + err);
        console.log("MySQL Result:", results);
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
        console.log("MySQL Error: " + err);
        console.log("MySQL Result:", results);
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

  static createOrder(accountId, tableId, items, next) {
    let values = [accountId, tableId];
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
      if (results.affectedRows == 0) {
        next({
          status: CANNOT_CREATE,
          message: "Error inserting and creating an order",
          kind: CANNOT_CREATE_KIND
        }, null)
      }
      let orderId = results.insertId;
      items.forEach(item => {
        values = [orderId, item.id, item.quantity, item.note];
        db.query(addMenuItemsToOrder, values, (err) => {
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
          if (!results.affectedRows) {
            next(
              {
                status: CANNOT_CREATE,
                message: "Error inserting and creating order items",
                kind: CANNOT_CREATE_KIND,
              },
              null
            );
            return;
          }
        });
      });
      next(null, {orderId: orderId});
    });
  }
}

module.exports = { Order, NOT_FOUND, EXISTS, CANNOT_CREATE };
