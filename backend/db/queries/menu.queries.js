const getAllMenuItems = `
SELECT menuitems.* FROM menuItems
`;

const getCategories = `
  SELECT * FROM categories
`;

const getCategory = `
SELECT categories.id FROM categories
WHERE categories.name = ?
`

const filterCategory = `
JOIN menuitemscategories ON menuitems.id = menuitemscategories.itemId
JOIN categories ON menuitemscategories.categoryId = categories.id
WHERE categories.name = ?
`

const filterPrice = `
WHERE menuitems.price <= ? AND menuitems.price >= ?
`

const filterPriceAND = `
AND menuitems.price <= ? AND menuitems.price >= ?
`

const sortMenuItems = `
ORDER BY`

const searchMenuItems = `
WHERE menuitems.name LIKE ?
`

const searchMenuItemsAND = `
AND menuitems.name LIKE ?
`

const deleteMenuItem = `
DELETE FROM menuItems
WHERE menuItems.id = ?
`

const deleteMenuItemCategories = `
DELETE FROM menuItemsCategories
WHERE menuItemsCategories.id = ?
`

const insertMenuItem = `
INSERT INTO menuItems(name, description, ingredients, price, thumbnail)
VALUES(?, ?, ?, ?, ?)
`

const insertMenuItemCategories = `
INSERT INTO menuItemsCategories (itemId, categoryId)
VALUES (?, ?)
`

module.exports = {
  getAllMenuItems,
  getCategories,
  getCategory,
  filterCategory,
  sortMenuItems,
  searchMenuItems,
  searchMenuItemsAND,
  filterPrice,
  filterPriceAND,
  deleteMenuItem,
  deleteMenuItemCategories,
  insertMenuItem,
  insertMenuItemCategories
};
