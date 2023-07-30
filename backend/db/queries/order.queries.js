const getMenuItemsByOrder = `
  SELECT OI.id as orderItemId, O.accountId as accountId, O.paid as paid, MI.name as itemName, MI.id as itemId, OI.quantity as quantity, OI.note as note, MI.price as price, OI.status, MI.thumbnail as thumbnail FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  where O.id = ?
`;

const getMenuDetailsByOrder = `
  SELECT MI.name as itemName, MI.id as itemId, OI.quantity as quantity, OI.note as note FROM 
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
  INSERT INTO orders (accountId, tableId, subtotal, paid, isPriority)
  VALUES(?, ?, ?, 1, ?);
`;

const getItemPrice = `
  SELECT menuitems.price FROM menuItems
  WHERE menuitems.id = ?
`;

const deleteTableOrderItems = `
  DELETE FROM orderItems
  WHERE orderId IN (
    SELECT id
    FROM orders
    WHERE tableId = ?
  );
`;

const deleteTableOrders = `
  DELETE FROM orders
  WHERE tableId = ?
`;

const setNewTableId = `
  INSERT INTO Tables (tableName, capacity) VALUES (
    CONCAT('table-', (SELECT MAX(id) + 1 FROM (SELECT * from tables) AS t)),
    ?
  );
`;

const getOrdersByStatus = `
  SELECT OI.id as orderItemId, O.id as orderId, O.tableId as tableId, O.orderTime as orderTime, MI.name as itemName, MI.id as itemId, OI.quantity as quantity, OI.status as status, OI.note as note, O.isPriority as isPriority FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  WHERE OI.status = ?
  order by O.isPriority DESC, O.orderTime, O.id
`;

const updateOrderItemStatus = `
  UPDATE orderItems
  SET status = ?
  WHERE id = ?
`;

const getOrdersForTableId = `
  SELECT * FROM orders WHERE tableId = ?
`;

const updateOrderPayStatus = `
  UPDATE orders
  SET paid = ?
  WHERE orders.id = ?
`;

module.exports = {
  getMenuItemsByAccount,
  getMenuItemsByOrder,
  createOrder,
  addMenuItemsToOrder,
  deleteTableOrderItems,
  deleteTableOrders,
  getItemPrice,
  setNewTableId,
  getOrdersForTableId,
  getOrdersByStatus,
  updateOrderItemStatus,
  updateOrderPayStatus,
};
