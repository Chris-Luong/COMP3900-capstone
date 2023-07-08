const getMenuItemsByOrder = `
  SELECT MI.name as name, MI.id as itemId, OI.quantity as quantity, MI.price as price FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  where O.id = ?
`;

const getOrders = `
  SELECT orders.*, menuitems.* FROM menuitems
  JOIN orders ON menuitems.id = orders.itemid
  WHERE orders.accountid = ?
`

const createOrder = `
  INSERT INTO orders(accountId, tableId, itemId, quantity, note)
  VALUES(?, ?, ?, ?, ?);
`;

module.exports = {
    getOrders, createOrder
};