const getMenuItemsByOrder = `
  SELECT MI.name as name, MI.id as itemId, OI.quantity as quantity, MI.price as price FROM 
  orders O 
    join orderItems OI on OI.orderId = O.id 
    join menuItems MI on MI.id = OI.itemId 
  where O.id = ?
`;

const createOrder = `
    INSERT INTO orders(accountId, tableId) VALUES(?, ?);
`;

const getLastOrder = `
    SELECT LAST_INSERT_ID();`

module.exports = {
    getMenuItemsByOrder, createOrder
};