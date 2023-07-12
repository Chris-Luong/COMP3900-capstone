const db = require("../db/db");
const {
  getMenuItemsByAccount,
  getMenuItemsByOrder,
  createOrder,
  addMenuItemsToOrder,
  deleteOrderById,
  deleteOrderItemsById,
  setNewTableId,
  getOrdersForTableId,
} = require("../db/queries/order.queries");

const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";
const CANNOT_CREATE = 400;
const CANNOT_CREATE_KIND = "cannot_create";
const CANNOT_DELETE = 400;
const CANNOT_DELETE_KIND = "cannot_delete";

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
            kind: CANNOT_CREATE_KIND,
          },
          null
        );
        return;
      }
      if (results.affectedRows == 0) {
        next(
          {
            status: CANNOT_CREATE,
            message: "Error inserting and creating an order",
            kind: CANNOT_CREATE_KIND,
          },
          null
        );
      }

      let orderId = results.insertId;
      items.forEach((item) => {
        values = [orderId, item.id, item.quantity, item.note];
        db.query(addMenuItemsToOrder, values, (err) => {
          if (err) {
            next(
              {
                status: CANNOT_CREATE,
                message: "Error inserting and creating an order",
                kind: CANNOT_CREATE_KIND,
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
      next(null, { orderId: orderId });
    });
  }

  static setNewTableId(next) {
    db.query(setNewTableId, (err, results) => {
      if (err) {
        next(
          {
            status: 500,
            message: "Error creating a new table id",
            kind: CANNOT_CREATE_KIND,
          },
          null
        );
        return;
      }
      let result = JSON.parse(JSON.stringify({ tableId: results.insertId }));
      next(null, result);
    });
  }

  static getOrdersForTableId(tableId, next) {
    db.query(getOrdersForTableId, tableId, (err, results) => {
      if (err) {
        next(
          {
            status: 500,
            message: "Error retrieving orders",
            kind: CANNOT_CREATE_KIND,
          },
          null
        );
        return;
      }
      let result = JSON.parse(JSON.stringify(results));
      next(null, result);
    });
  }

  static deleteOrder(orderId, next) {
    db.query(deleteOrderItemsById, [orderId], (err, results) => {
      if (err) {
        next(
          {
            status: CANNOT_DELETE,
            message: "Error deleting orderItems",
            kind: CANNOT_DELETE_KIND,
          },
          null
        );
        return;
      }

      if (results.affectedRows == 0) {
        next(
          {
            status: CANNOT_DELETE,
            message: "Error deleting order items",
            kind: CANNOT_DELETE_KIND,
          },
          null
        );
        return;
      }

      db.query(deleteOrderById, [orderId], (err, results) => {
        if (err) {
          next(
            {
              status: CANNOT_DELETE,
              message: "Error deleting the order",
              kind: CANNOT_DELETE_KIND,
            },
            null
          );
          return;
        }

        if (results.affectedRows == 0) {
          next(
            {
              status: CANNOT_DELETE,
              message: "Error deleting the order",
              kind: CANNOT_DELETE_KIND,
            },
            null
          );
          return;
        }
      });

      next(null, { deleted: results.affectedRows });
    });
  }
}

module.exports = { Order, NOT_FOUND, EXISTS, CANNOT_CREATE };
