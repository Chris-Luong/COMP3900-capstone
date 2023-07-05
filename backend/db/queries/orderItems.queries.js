const addMenuItemsToOrder = `
    INSERT INTO orderItems(itemId, orderId, quantity) VALUES(?, ?, ?)
`
module.exports = {
    addMenuItemsToOrder
};