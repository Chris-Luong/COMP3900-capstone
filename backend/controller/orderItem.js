const { Order, NOT_FOUND, CANNOT_CREATE} = require('../models/order.model');
const { OrderItem } = require('../models/orderItem.model');

/* This viewOrder function is for getting all the menu items in the given orderId
*  Request: orderId int,
*  Result: List of menu items with { itemName, itemId, quantity, price }
*/
viewOrders = (req, res) => {
  const orderId = req.query.orderId;
  Order.getOrderById(orderId, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Order Not Found" });
    }
    return res.status(200).json({items: result}); 
  });
};

/* This createOrder function is for creating a new Order. 
*  This should typically be called when the customer starts to order.
*  Request: accountId int,
*  Result: orderId
*/
createOrder = (req, res) => {
    const { accountId, tableId } = req.body;
    Order.createOrder(accountId, tableId, (err, result) => {
        if (err) {
            return res.status(err.status).json({ message: err.message });
        }
        if (!result) {
            return res.status(NOT_FOUND).json({ message: "Cannot Create Order" });
        }
        return res.status(200).json(result); 
    })
}

/* This createOrder function is for creating a new Order. 
*  This should typically be called when the customer clicks on the "Add TO CART" button of the particular menu item.
*  Request: menuItem int, orderId int, accountId int
*  Result: {}
*/

addMenuItems = (req, res) => {
    OrderItem.addMenuitemToTheOrder(req.body, (err, result) => {
      if (err) {
        return res.status(err.status).json({ message: err.message });
      }
      return res.status(200).json({}); 
    });
  };

module.exports = { viewOrders, addMenuItems, createOrder };