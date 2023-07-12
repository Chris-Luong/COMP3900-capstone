const getMenuItemsByOrder = `
  SELECT O.accountId as accountId, MI.name as itemName, MI.id as itemId, OI.quantity as quantity, OI.note as note, MI.price as price, MI.thumbnail as thumbnail FROM 
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
    INSERT INTO orderItems(orderId, itemId, quantity, note) VALUES(?, ?, ?, ?)
`

const getMenuItemsByAccount = `
  SELECT O.id as orderId, MI.name as itemName, MI.id as itemId, OI.quantity as quantity, OI.note as note, MI.price as price, MI.thumbnail as thumbnail FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  where O.accountId = ?
`

const createOrder = `
  INSERT INTO orders (accountId, tableId)
  VALUES(?, ?);
`;

const createOrderWithAccountId = `
  INSERT INTO orders (tableId, accountId) 
  VALUES (?, ?)
`;

const getPendingOrders = `
  SELECT id, tableId from orders where status = 'pending'
`

module.exports = {
  getMenuItemsByAccount, getMenuItemsByOrder, createOrder, addMenuItemsToOrder, getMenuDetailsByOrder, getPendingOrders
};