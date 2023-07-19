const { Order, NOT_FOUND, CANNOT_CREATE } = require("../models/order.model");

/**
 * The callback to return the error or result of this function
 * @callback callback
 * @param {object}        error            The error if encountered, null otherwise
 * @param {object}        result           List of order details and item details
 * @param {result}        [
                            {
                              "orderId": 1,
                              "paid": 0,
                              "itemName": "Pancakes",
                              "itemId": 1,
                              "quantity": 1,
                              "note": "Fresh...",
                              "price": 7.99,
                              "status": "Preparing",
                              "thumbnail": "..."
                            },
                            { ... }
                          ]
*/
/**
 * Getting all the menu items from a given account id.
 * @param {int}           accountId        The id of the account
 * @param {int}           orderId          The id of the order
 * @param {callback}      cb               Callback function
 *
 * @returns {null}
 */
viewOrders = (req, res) => {
  if (req.query.accountId) {
    Order.getOrderByAccountId(req.query.accountId, (err, result) => {
      if (err) {
        return res.status(err.status).json({ message: err.message });
      }
      if (!result) {
        return res.status(NOT_FOUND).json({ message: "Order Not Found" });
      }
      return res.status(200).json(result);
    });
  } else {
    Order.getOrderByOrderId(req.query.orderId, (err, result) => {
      if (err) {
        return res.status(err.status).json({ message: err.message });
      }
      if (!result) {
        return res.status(NOT_FOUND).json({ message: "Order Not Found" });
      }
      return res.status(200).json(result);
    });
  }
};

/**
 * The callback to return the error or result of this function
 * @callback callback
 * @param {object}        error            The error if encountered, null otherwise
 * @param {object}        result           The result if successful, null otherwise
 */
/**
 * This createOrder function is for creating a new order.
 * This should typically be called when the customer starts to order.
 * @param {int}           tableId          The id of the table
 *
 * @returns {orderId: orderId}
 */
createOrder = (req, res) => {
  const { accountId, tableId, items } = req.body;
  Order.createOrder(accountId, tableId, items, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Cannot Create Order" });
    }
    return res.status(200).json(result);
  });
};

/**
 * This deleteOrder function is for deleting a new order by order id
 * This should typically be called when the customer requests their bill
 * @param {int}           orderId          The id of the order
 * 
 * @returns {null}
 */

deleteOrder = (req, res) => {
  const { orderId } = req.body;
  Order.deleteOrder(orderId, (err, result) => {
      if (err) {
          return res.status(err.status).json({ message: err.message });
      }
      return res.status(200).json();
  })
}

/**
 * The callback to return the error or result of this function
 * @callback callback
 * @param {object}        error            The error if encountered, null otherwise
 * @param {object}        result           The result if successful, null otherwise
 */
/**
 * This setNewTable function is for creating a new table.
 * This should typically be called when the customer checks in.
 *
 * @returns {tableId: tableId}
 */
setNewTable = (req, res) => {
  Order.setNewTableId((err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Cannot Create Table" });
    }
    return res.status(200).json(result);
  });
};

/**
 * The callback to return the error or result of this function
 * @callback callback
 * @param {object}        error            The error if encountered, null otherwise
 * @param {object}        result           The result if successful, null otherwise
 */
/**
 * Returns all orders associated with a table ID
 *  * @param {int}           tableId          The id of the table
 *
 * @returns {tableId: tableId}
 */
getOrdersForTableId = (req, res) => {
  const tableId = req.params["tableid"];
  Order.getOrdersForTableId(tableId, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Cannot Retrieve Orders" });
    }
    return res.status(200).json(result);
  });
};

/**
 * This viewOrdersByStatus function is for kitchen stuff / wait stuff to view all pending orders
 * This should typically be called when opening up the orders interface
 * 
 *  * @param {string}           status          status of orders to retrieve
 *
 * @returns {List of orderItems with the given status grouped by order id: {orderId, orderTime, itemName, itemId, quantity, status, note}}
*/

viewOrdersByStatus = (req, res) => { 
  const status = req.params["status"];
  Order.getOrdersByStatus(status, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Error Retrieving Orders" });
    }
    return res.status(200).json(result);
  });
};

/**
 * for staff to update individual order items
 * 
 *  * @param {string}           id          id from orderItems table
 *  * @param {string}           newStatus          new status
 *
 * @returns {List of orderItems with the given status grouped by order id: {orderId, orderTime, itemName, itemId, quantity, status, note}}
*/
updateOrderItemStatus = (req, res) => {
  const {id, newStatus} = req.query;
  Order.updateOrderItemStatus(id, newStatus, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res
        .status(NOT_FOUND)
        .json({ message: "Error Updating Order Item Status" });
    }
    return res.status(200).json({message: `order item with ${id} is now ${newStatus}`});
  });
};

updateOrderPayStatus = (req, res) => {
  const { orderIds, status} = req.query;
  Order.updatePayStatus(orderIds, status, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Error updating paid statuses on orders" });
    }
    return res.status(200).json(result);
  });
}

module.exports = {
  viewOrders,
  createOrder,
  setNewTable,
  getOrdersForTableId,
  deleteOrder,
  viewOrdersByStatus,
  updateOrderItemStatus,
  updateOrderPayStatus
};