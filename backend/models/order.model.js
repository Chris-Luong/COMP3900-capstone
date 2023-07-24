const db = require("../db/db");
const {
  getMenuItemsByAccount,
  getMenuItemsByOrder,
  createOrder,
  addMenuItemsToOrder,
  getItemPrice,
  setNewTableId,
  getOrdersForTableId,
  getOrdersByStatus,
  updateOrderItemStatus,
  updateOrderPayStatus,
  deleteTableOrderItems,
  deleteTableOrders,
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
        next(
          {
            status: EXISTS,
            message: "Error retrieving menu items by the given order id",
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

  static createOrder(accountId, tableId, items, next) {
    let subtotal = 0;
    let itemCount = 0;

    const processItem = (item) => {
      db.query(getItemPrice, item.id, (err, result) => {
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
        subtotal += result[0].price * item.quantity;
        itemCount++;
        if (itemCount === items.length) {
          processOrder();
        }
      });
    };

    const processOrder = () => {
      let values = [accountId, tableId, subtotal];
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
          return;
        }

        let orderId = results.insertId;
        let processedItemCount = 0;

        const processMenuItem = (item) => {
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
            processedItemCount++;
            if (processedItemCount === items.length) {
              next(null, {
                orderId: orderId,
                subtotal: subtotal,
              });
            }
          });
        };

        items.forEach((item) => {
          processMenuItem(item);
        });
      });
    };

    items.forEach((item) => {
      processItem(item);
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

  static deleteTableOrders(tableId, next) {
    db.query(deleteTableOrderItems, tableId, (err, results) => {
      if (err) {
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

      db.query(deleteTableOrders, tableId, (err, results) => {
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

        next(null, { message: "Successfully deleted orders" });
      });
    });
  }

  static getOrdersByStatus(status, next) {
    db.query(getOrdersByStatus, status, (err, results) => {
      if (err) {
        next(
          {
            status: EXISTS,
            message: "Error retrieving order menu items",
            kind: EXISTS_KIND,
          },
          null
        );
        return;
      }

      const orders = {};
      results.forEach((item) => {
        if (!orders[item.orderId]) {
          const time = new Date(item.orderTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          orders[item.orderId] = {};
          orders[item.orderId].tableId = item.tableId;
          orders[item.orderId].orderTime = time;
          orders[item.orderId].items = [];
        }
        orders[item.orderId].items.push(item);
      });
      let result = JSON.parse(JSON.stringify(orders));
      next(null, result);
    });
  }

  static updateOrderItemStatus(id, newStatus, next) {
    db.query(updateOrderItemStatus, [newStatus, id], (err, results) => {
      if (err) {
        next(
          {
            status: EXISTS,
            message: "Error updating order menu item",
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

  static updatePayStatus(orderIds, status, cb) {
    let new_orderIds = Array.isArray(orderIds) ? orderIds : [orderIds];

    new_orderIds.forEach((orderId) => {
      const values = [status, orderId];
      db.query(updateOrderPayStatus, values, (err, results) => {
        if (err) {
          cb(
            {
              status: EXISTS,
              message: "Error updating order pay status",
              kind: EXISTS_KIND,
            },
            null
          );
          return;
        }
      });
    });

    cb(null, { message: "Successfully updated pay status on orders" });
  }
}
module.exports = { Order, NOT_FOUND, EXISTS, CANNOT_CREATE };
