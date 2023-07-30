const getCategories = `
  SELECT * FROM categories
`;

const insertCategory = `
INSERT INTO categories(name)
VALUES (?)
`;

const deleteCategory = `
DELETE FROM categories
WHERE categories.id = ?
`;

const getCategoryNamesFromItemId = `
  SELECT name FROM categories JOIN menuItemsCategories
  ON categories.id = menuItemsCategories.categoryId
  WHERE menuItemsCategories.itemId = ?;
`;

const getCategory = `
SELECT categories.id FROM categories
WHERE categories.name = ?
`;

const deleteCategoryMenuItems = `
DELETE FROM menuItemsCategories
WHERE menuItemsCategories.categoryId = ?
`;

const getAllMenuItems = `
SELECT menuItems.* FROM menuItems
`;

const filterCategory = `
JOIN menuItemsCategories ON menuItems.id = menuItemsCategories.itemId
JOIN categories ON menuItemsCategories.categoryId = categories.id
WHERE categories.name = ?
`;

const filterPrice = `
WHERE menuItems.price <= ? AND menuItems.price >= ?
`;

const filterPriceAND = `
AND menuItems.price <= ? AND menuItems.price >= ?
`;

const sortMenuItems = `
ORDER BY`;

const searchMenuItems = `
WHERE menuItems.name LIKE ?
`;

const searchMenuItemsAND = `
AND menuItems.name LIKE ?
`;

const deleteMenuItem = `
DELETE FROM menuItems
WHERE menuItems.id = ?
`;

const deleteMenuItemCategories = `
DELETE FROM menuItemsCategories
WHERE menuItemsCategories.itemId = ?
`;

const insertMenuItem = `
INSERT INTO menuItems(name, description, ingredients, price, thumbnail)
VALUES(?, ?, ?, ?, ?)
`;

const insertMenuItemCategories = `
INSERT INTO menuItemsCategories (itemId, categoryId)
VALUES (?, ?)
`;

const updateMenuItem = `
UPDATE menuItems
SET name = ?, description = ?, ingredients = ?, price = ?, thumbnail = ?
WHERE menuItems.id = ?
`;

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
  updateMenuItem,
};
