const getMenuItemsByOrder = `
  SELECT O.accountId as accountId, O.paid as paid, MI.name as itemName, MI.id as itemId, OI.quantity as quantity, OI.note as note, MI.price as price, OI.status, MI.thumbnail as thumbnail FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  where O.id = ?
`;

const addMenuItemsToOrder = `
    INSERT INTO orderItems(orderId, itemId, quantity, note, status) VALUES(?, ?, ?, ?, "Preparing")
`;

const getMenuItemsByAccount = `
  SELECT O.id as orderId, O.paid as paid, MI.name as itemName, MI.id as itemId, OI.quantity as quantity, OI.note as note, MI.price as price, OI.status, MI.thumbnail as thumbnail FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  where O.accountId = ?
`;

const createOrder = `
  INSERT INTO orders (accountId, tableId, subtotal, paid)
  VALUES(?, ?, ?, 0);
`;

const getItemPrice = `
  SELECT menuitems.price FROM menuItems
  WHERE menuitems.id = ?
`

const deleteOrderById = `
  DELETE FROM orders where id = ?
`;

const deleteOrderItemsById = `
  DELETE FROM orderitems where orderId = ?
`;

const setNewTableId = `
  INSERT INTO tables VALUES (id);
`;

const getOrdersForTableId = `
  SELECT * FROM orders WHERE tableId = ?
`;

module.exports = {
  getMenuItemsByAccount,
  getMenuItemsByOrder,
  createOrder,
  addMenuItemsToOrder,
  deleteOrderById,
  deleteOrderItemsById,
  getItemPrice,
  setNewTableId,
  getOrdersForTableId,
};
