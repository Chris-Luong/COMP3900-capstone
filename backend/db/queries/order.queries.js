const getMenuItemsByOrder = `
  SELECT MI.name as name, MI.id as itemId, OI.quantity as quantity, MI.price as price FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  where O.id = ?
`;

const addMenuItemsToOrder = `
    INSERT INTO orderItems(itemId, orderId, quantity, note) VALUES(?, ?, ?, ?)
`

const getOrders = `
  SELECT * from orders
  WHERE accountId = ?
`

const createOrder = `
  INSERT INTO orders (tableId)
  VALUES(?);
`;

const createOrderWithAccountId = `
  INSERT INTO orders (tableId, accountId) 
  VALUES (?, ?)
`;


module.exports = {
    getOrders, getMenuItemsByOrder, createOrder, addMenuItemsToOrder
};