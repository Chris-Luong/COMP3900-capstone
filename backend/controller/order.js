const { Order, NOT_FOUND, CANNOT_CREATE} = require('../models/order.model');
const { OrderItem } = require('../models/orderItem.model');

/**
 * The callback to return the error or result of this function
 * @callback callback
 * @param {object}        error            The error if encountered, null otherwise
 * @param {object}        result           List of order details and item details
 * @param {result}        [{
                            accountId: 1,
                            tableId: 1,
                            itemId: 1,
                            quantity: 1,
                            note: 'burnt please',
                            orderTime: 2023-07-08T12:46:16.000Z,
                            id: 1,
                            name: 'Pancakes',
                            description: 'Delicious fluffy pancakes served with syrup and butter.',
                            ingredients: null,
                            price: 7.99,
                            availability: 1,
                            thumbnail: null,
                            createdAt: 2023-07-08T12:46:15.000Z,
                            updatedAt: 2023-07-08T12:46:15.000Z
                          }]
*/
/**
 * Getting all the menu items from a given account id.
 * @param {int}           accountId        The id of the account
 * @param {callback}      cb               Callback function
 * 
 * @returns {null}
 */
viewOrders = (req, res) => {
  const accountId = req.query.accountId;
  Order.getOrderByAccountId(accountId, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Order Not Found" });
    }
    return res.status(200).json(result); 
  });
};

/**
 * Getting all the menu items from a given account id.
 * @param {int}           accountId        The id of the account
 * @param {callback}      cb               Callback function
 * 
 * @returns {list of ordered menu itens including }
 */
viewOrdersByOrderId = (req, res) => {
  const orderId = req.query.orderId;
  console.log("OrderId" + orderId);
  Order.getOrderByOrderId(orderId, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Order Not Found" });
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
 * This createOrder function is for creating a new order.
 * This should typically be called when the customer starts to order.
 * @param {int}           tableId          The id of the table
 * 
 * @returns {orderId: orderId}
 */
createOrder = (req, res) => {
    const { tableId } = req.body;
    Order.createOrder(tableId, (err, result) => {
        if (err) {
            return res.status(err.status).json({ message: err.message });
        }
        if (!result) {
            return res.status(NOT_FOUND).json({ message: "Cannot Create Order" });
        }
        return res.status(200).json(result);
    })

}
 
/**
 * This addMenuItems function is for adding menu items to the order
 * This should typically be called when the customer finalise and submit their order
 * @param {int}           itemId          The id of the menu item
 * @param {int}           orderId         The id of the order
 * @param {int}           quantity        The menu item quantity
 * @param {int}           note            The note
 * 
 * @returns {null}
 */

addMenuItems = (req, res) => {
  OrderItem.addMenuitemToTheOrder(req.body, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    return res.status(200).json({}); 
  });
};


module.exports = { viewOrders, viewOrdersByOrderId, createOrder, addMenuItems };