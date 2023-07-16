const getCategories = `
  SELECT * FROM categories
`;

const insertCategory = `
INSERT INTO categories(name)
VALUES (?)
`

const deleteCategory = `
DELETE FROM categories
WHERE categories.id = ?
`

const getCategoryNamesFromItemId = `
  SELECT name FROM categories JOIN menuitemscategories
  ON categories.id = menuitemscategories.categoryId
  WHERE menuitemscategories.itemId = ?;
`;


const getCategory = `
SELECT categories.id FROM categories
WHERE categories.name = ?
`

const deleteCategoryMenuItems = `
DELETE FROM menuItemsCategories
WHERE menuItemsCategories.categoryId = ?
`

const getAllMenuItems = `
SELECT menuitems.* FROM menuItems
`;


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
WHERE menuItemsCategories.itemId = ?
`

const insertMenuItem = `
INSERT INTO menuItems(name, description, ingredients, price, thumbnail)
VALUES(?, ?, ?, ?, ?)
`

const insertMenuItemCategories = `
INSERT INTO menuItemsCategories (itemId, categoryId)
VALUES (?, ?)
`

const updateMenuItem = `
UPDATE menuItems
SET name = ?, description = ?, ingredients = ?, price = ?, thumbnail = ?
WHERE menuItems.id = ?
`

module.exports = {
  getAllMenuItems,
  getCategories,
  insertCategory,
  deleteCategory,
  deleteCategoryMenuItems,
  getCategoryNamesFromItemId,
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
  insertMenuItemCategories,
  updateMenuItem
};
