const db = require("../db/db");
const { addMenuItemsToOrder } = require("../db/queries/orderItems.queries");



const CANNOT_CREATE = 400;
const CANNOT_CREATE_KIND = "cannot create";

class OrderItem {
  constructor(itemId, orderId, quantity) {
    this.itemId = itemId,
    this.orderId = orderId,
    this.quantity = quantity
  }

 static addMenuitemToTheOrder(newOrderItem, next) {
    return db.query(addMenuItemsToOrder, [newOrderItem.itemId, newOrderItem.orderId, newOrderItem.quantity], (err, results) => {
        console.log("MySQL Error: " + err);
        console.log("MySQL Result:", results);
  
        if (err) {
          return next(
            {
              status: CANNOT_CREATE,
              message: "Error inserting and creating order items",
              kind: CANNOT_CREATE_KIND,
            },
            null
          );
        }

        if (results.affectedRows == 0) {
          // if failed to insert the order
          return next(
            {
              status: CANNOT_CREATE,
              message: "Error inserting and creating order items",
              kind: CANNOT_CREATE_KIND,
            },
            null
          );
        }
        return next(null, null);
      });
  }
}

module.exports = { OrderItem, CANNOT_CREATE };